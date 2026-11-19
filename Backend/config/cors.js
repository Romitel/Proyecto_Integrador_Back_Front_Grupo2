exports.corsConfig = {
  origin: (origin, callback) => {
    const whitelist = [
      "http://localhost:4200", 
      "http://TU-BUCKET-S3.s3-website.us-east-2.amazonaws.com" // <-- Acá va la URL de tu S3
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