// Import the mongoose library
const mongoose = require("mongoose");

// Create a schema instance using mongoose.Schema
const Schema = mongoose.Schema;

// Define the person schema as an object
const personSchema = {
  name: { type: String, required: true }, // Person's name, required field
  age: Number, // Person's age, optional field
  favoriteFoods: [String], // Array of favorite foods, can be empty
};

// Create the Person model using mongoose.model
const Person = mongoose.model("Person", personSchema);

// Export the Person model for use in other files
module.exports = Person;
