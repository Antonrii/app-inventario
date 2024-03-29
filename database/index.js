const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("DB CONNECTED");
    } catch (error) {
        console.log("DB CONNECTION ERR", error);
        process.exit(1);
    }
};

module.exports = connectDB;