const mongoose = require("mongoose");

const connectDB = async () => {
  const mongouri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dewtyms.mongodb.net/socialNetwork?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(
      mongouri,
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      console.log("connected to database")
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectDB;
