const express = require("express");
const decompress = require("decompress");
const main = require("./src/storageAuth");
const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/download", async (req, res) => {
  main(res, req);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
