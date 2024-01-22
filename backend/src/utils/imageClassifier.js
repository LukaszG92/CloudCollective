const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;


const key = '8a5e073b41944d03b0a65203e7abf3fd';
const endpoint = 'https://cloud-collective-computervision.cognitiveservices.azure.com/';


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