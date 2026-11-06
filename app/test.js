const assert = require("assert");
const handler = require("./server");

let body = "";
const res = {
  writeHead: (code) => { assert.strictEqual(code, 200); },
  end: (data) => { body = data; }
};

handler({}, res);
assert.strictEqual(JSON.parse(body).status, "ok");
console.log("All tests passed");