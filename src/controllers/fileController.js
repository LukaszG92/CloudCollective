const multer = require('multer')
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage
require('dotenv').config()

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const resolveBlobName = (req, file) => {
    return new Promise((resolve, reject) => {
        const blobName = `${Date.now()}-${file.originalname}.${MIME_TYPE_MAP[file.mimetype]}`
        resolve(blobName)
    })
}


const azureStorage = new MulterAzureStorage({
    connectionString: process.env.BLOB_ACCOUNT_STRING,
    accessKey: process.env.BLOB_ACCOUNT_KEY,
    accountName: process.env.BLOB_ACCOUNT_NAME,
    containerName: 'images',
    blobName: resolveBlobName,
    containerAccessLevel: 'blob',
    urlExpirationTime: 5
})

const upload = multer({
    storage: azureStorage
})

module.exports = upload;