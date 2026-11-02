const server = require('./server');

const PORT = process.env.PORT;
const HOST = process.env.HOST;

server.listen(PORT, HOST, () => {
  console.log(`server listening in the port http://${HOST}:${PORT}`);
});
