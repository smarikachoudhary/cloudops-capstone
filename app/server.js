const http = require("http");

function handler(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "CloudOps CI/CD app", status: "ok" }));
}

if (require.main === module) {
  http.createServer(handler).listen(3000, () => console.log("Running on 3000"));
}

module.exports = handler;