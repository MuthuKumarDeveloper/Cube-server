const CubejsServer = require("@cubejs-backend/server");

const dbType = "postgres";
const options = {
  dbType,
};

const server = new CubejsServer(options);

server.listen().then(({ version, port }) => {
  console.log(`🚀 Cube.js server (${version}) is listening on ${port}`);
});
