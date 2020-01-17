module.exports = {
    keys_prod: {
        mongoURI: process.env.MONGO_URI,
    },
};

module.exports = {
    keys_dev: {
        mongoURI: "mongodb://localhost:27017/netguru",
        //mongoURI: "mongodb://mongo:27017/netguru",
    }
}