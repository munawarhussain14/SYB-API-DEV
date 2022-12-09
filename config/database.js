const mongoose = require("mongoose");
const mongooseIntl = require("mongoose-intl");

const contactDatabase = () => {
  console.log("DB_LOCAL_URI", process.env.DB_LOCAL_URI);
  
  mongoose.plugin(mongooseIntl, {
    languages: ["en", "ar", "fr"],
    defaultLanguage: "en",
  });

  mongoose
    .connect(process.env.DB_LOCAL_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((con) => {
      console.log(
        `Mongodb Database connected with Host ${con.connection.host}`
      );
    });
};

module.exports = contactDatabase;
