const {
  ShareServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-file-share");
var stream = require("stream");

// Load the .env file if it exists
require("dotenv").config();

const main = async (res, req) => {
  // Enter your storage account name and shared key
  const ACCOUNT_NAME_H='appversion'
  const storageKeyH = 'sG3BHKO9jc00e1K+VsOg7UxVNJW+tNYzSedUA9AxBhUN'
  const account = ACCOUNT_NAME_H+'serverstorage';
  const accountKey = storageKeyH+'PdCSRufv9rr+3s/S7EfOa13WljJLckju+AStXhPK6g==';

  // Use StorageSharedKeyCredential with storage account and account key
  // StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
  const sharedKeyCredential = new StorageSharedKeyCredential(
    account,
    accountKey
  );

  // List shares
  const serviceClient = new ShareServiceClient(
    `https://${account}.file.core.windows.net`,
    sharedKeyCredential
  );

  const shares = "apks";
  const fileName = "app-release.apk";

  async function streamToBuffer(readableStream) {
    return new Promise((resolve, reject) => {
      const chunks = [];
      readableStream.on("data", (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
      });
      readableStream.on("end", () => {
        res.pipe(chunks);
        resolve(Buffer.concat(chunks));
      });
      readableStream.on("error", reject);
    });
  }

  const fileClient = serviceClient
    .getShareClient(shares)
    .rootDirectoryClient.getFileClient(fileName);

  fileClient
    .downloadToFile("./public/APKs/app-release.apk")
    .then(() => {
        res.download('./public/APKs/app-release.apk');
    })
    .finally(() => {
        console.log('finnaly')
    });
};

module.exports = main;
