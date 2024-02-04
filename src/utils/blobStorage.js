const {
    StorageSharedKeyCredential,
    AccountSASServices,
    AccountSASResourceTypes,
    AccountSASPermissions,
    SASProtocol,
    generateAccountSASQueryParameters,
    BlockBlobClient
} = require("@azure/storage-blob");
require('dotenv').config()

const sharedKeyCredential = new StorageSharedKeyCredential(
    process.env.BLOB_ACCOUNT_NAME,
    process.env.BLOB_ACCOUNT_KEY
);

const getBlobSas = (blobName) => {

    const sasOptions = {
        services: AccountSASServices.parse("b").toString(),
        resourceTypes: AccountSASResourceTypes.parse("o").toString(),
        permissions: AccountSASPermissions.parse("r"),
        protocol: SASProtocol.Https,
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + (60 * 1000)),
    };

    let sasToken = generateAccountSASQueryParameters(
        sasOptions,
        sharedKeyCredential
    ).toString();

    sasToken = (sasToken[0] === '?') ? sasToken : `?${sasToken}`;

    let sasUrl = `${blobName}${sasToken}`;

    const client = new BlockBlobClient(sasUrl);

    return client.url;
}

module.exports = getBlobSas;