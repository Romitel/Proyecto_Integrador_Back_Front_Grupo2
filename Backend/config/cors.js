exports.corsConfig = {
  origin: (origin, callback) => {
    const whitelist = [
      "http://localhost:4200", 
      "http://estoyfrontend.s3-website.us-east-2.amazonaws.com"
    ];
    
    // Permitir peticiones sin origen (como Postman o curl) y las de la whitelist
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.error("Bloqueado por CORS:", origin); // Para debug
      callback(new Error("error cors"));
    }
  },
  credentials: true
};