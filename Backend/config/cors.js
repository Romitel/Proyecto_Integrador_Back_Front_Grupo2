exports.corsConfig = {
  origin: (origin, callback) => {
    const whitelist = ["http://localhost:4200"];
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("error cors"));
    }
  },
};
