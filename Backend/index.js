const server = require('./server');

const PORT = process.env.BACKEND_PORT;
const HOST = process.env.BACKEND_URL;

server.listen(PORT, HOST, () => {
  console.log(`server listening in the port http://${HOST}:${PORT}`);
});
