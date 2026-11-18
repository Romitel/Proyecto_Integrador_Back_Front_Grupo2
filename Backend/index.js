const server = require('./server');

const PORT = process.env.PORT || 3000;
// En AWS no habrá HOST, así que por defecto escuchará en 0.0.0.0 (necesario para Docker)
const HOST = process.env.HOST || '0.0.0.0'; 

server.listen(PORT, HOST, () => {
  console.log(`server listening in the port http://${HOST}:${PORT}`);
});