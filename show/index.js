const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.USERS_TABLE_NAME

exports.handler = async (event) => {
    console.info(`TABLE_NAME=${TABLE_NAME}`)

    const users = await getUser(event.pathParameters.id);

    return {
        statusCode: 200,
        body: JSON.stringify(users),
    }
}

async function getUser(id) {
    const params = {
        Key: {
            id: id,
        },
        TableName: TABLE_NAME,
    };

    return dynamo.get(params).promise().then((result) => {
        return result.Item
    });
}