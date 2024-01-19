const mongoose = require("mongoose");
/* const { dbUser, dbPassword, dbHost, dbName } = require("../configs/db.configs"); */

const mongoConnect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:admin@ecommerce.ivkhnnu.mongodb.net/ecommerce?retryWrites=true&w=majority`
    );
    console.log("DB is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoConnect;
