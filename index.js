const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");
const { findOneAndUpdate } = require("./models/Recipe.model");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  // .then(() => {
  //   return Recipe.create({
  //     title: "Canelons",
  //     level: "Amateur Chef",
  //     cuisine: "Catalan",
  //     dishType: "main_course",
  //     durantion: 120,
  //     creator: "Alex",
  //   });
  // })
  // .then((recipe) => {
  //   console.log("new recipe created", recipe);
  // })
  .then(() => {
    return Recipe.insertMany(data);
  })

  .then((recipes) => {
    console.log(recipes);
  })
  .then(() => {
    return Recipe.findOneAndUpdate(
      {
        title: "Rigatoni alla Genovese",
      },
      { duration: 100 },
      { new: true }
    );
  })
  .then(() => {
    return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
