const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;


const key = process.env.CV_KEY
const endpoint = process.env.CV_ENDPOINT


const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);


async function computerVision(url) {
    let response = await computerVisionClient.analyzeImage(url,
        {visualFeatures:["Categories"]
        });
    if(!response.categories.length)
        return ""
    let trimmed = response.categories[0].name.slice(0, response.categories[0].name.indexOf('_'));
    console.log(trimmed)
    return trimmed
}

module.exports = computerVision