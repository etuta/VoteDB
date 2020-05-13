/* eslint-disable no-console */
const http = require("http");
const { app } = require("./routes");

console.log("Trying to listen");
const server = http.createServer(app).listen(process.env.PORT || 3001);
console.log("Listening on port %d", server.address().port); // eslint-disable-line no-console
