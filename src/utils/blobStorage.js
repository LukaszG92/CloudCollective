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
        services: AccountSASServices.parse("b").toString(),                     // blobs
        resourceTypes: AccountSASResourceTypes.parse("sco").toString(),    // service, container, object
        permissions: AccountSASPermissions.parse("rwdlacupi"),               // permissions
        protocol: SASProtocol.Https,
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + (2 * 60 * 1000)),              // 2 minutes
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