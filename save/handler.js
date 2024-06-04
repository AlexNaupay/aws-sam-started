const AWS = require('aws-sdk');
const crypto = require("crypto");

const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.USERS_TABLE_NAME

exports.save = async (event) => {
    const body = JSON.parse(event.body);
    const uuid = crypto.randomUUID();

    const user = {
        id: uuid,
        name: body.name,
        age: body.age
    }

    console.log(user);

    const savedUser = await saveUser(user);

    return {
        statusCode: 200,
        body: JSON.stringify(savedUser),
    }
}

async function saveUser(user) {
    const params = {
        TableName: TABLE_NAME,
        Item: user
    };

    console.info(params)

    return dynamo.put(params).promise().then((response) => {
        console.info(response);
        return user;
    });
}