const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.USERS_TABLE_NAME

console.info(`Starting lambda: ${new Date().toISOString()}`);

exports.handler = async (event) => {
    console.info(`TABLE_NAME=${TABLE_NAME}`)
    const users = await getUsers();

    return {
        statusCode: 200,
        body: JSON.stringify(users),
    }
}

async function getUsers() {
    const params = {
        TableName: TABLE_NAME,
    };

    return dynamo.scan(params).promise().then((response) => {
        return response.Items
    });
}