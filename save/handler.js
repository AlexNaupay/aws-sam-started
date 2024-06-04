exports.save = async (event) => {
    console.log(JSON.parse(event.body));

    return {
        statusCode: 200,
        body: 'Hello World!'
    }
}