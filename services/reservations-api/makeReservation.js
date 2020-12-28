import AWS from "aws-sdk";
import * as uuid from "uuid";

const ddb = new AWS.DynamoDB.DocumentClient();

export async function main(event,context) {
    const { content } = JSON.parse(event.body);

    const params = {
        TableName: "reservations",
        Item: {
            reservationId: uuid.v1(),
            productId: "3480ab60-48aa-11eb-baa7-671b85840eb5",
            content: content,
            createdAt: Date.now(),
        },
    };

    try{
        await ddb.put(params).promise();

        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    }catch(err){
        return{
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
        };
    }
}