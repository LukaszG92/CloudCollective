const multer = require('multer');
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const resolveBlobName = (req, file) => {
    return new Promise((resolve, reject) => {
        const blobName = `${Date.now()}-${file.originalname}.${MIME_TYPE_MAP[file.mimetype]}`;
        resolve(blobName);
    });
};


const azureStorage = new MulterAzureStorage({
    connectionString: 'DefaultEndpointsProtocol=https;AccountName=cloudcollective;AccountKey=MyzYHUTk2Rd2c4mq0J520R+KiHCLJkD0E6sdvWx1vE+JQA2E5aToIcoS4Ioki1W2d7dN6s9rCu3N+AStMlL9hQ==;EndpointSuffix=core.windows.net',
    accessKey: 'MyzYHUTk2Rd2c4mq0J520R+KiHCLJkD0E6sdvWx1vE+JQA2E5aToIcoS4Ioki1W2d7dN6s9rCu3N+AStMlL9hQ==',
    accountName: 'cloudcollective',
    containerName: 'images',
    blobName: resolveBlobName,
    containerAccessLevel: 'blob',
    urlExpirationTime: 5
});

const upload = multer({
    storage: azureStorage
});

module.exports = upload;