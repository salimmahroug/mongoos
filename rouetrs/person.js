const express = require("express");
const router = express.Router();
const Person = require("../Models/personSchema");

router.post("/newPerson", (req, res) => {
  let newPerson = new Person(req.body);
  newPerson.save((err, data) => {
    err ? console.log(err) : res.send({ msg: "New person was added" });
  });
});
// Create Many Records with model.create()
router.post("/manyPeople", (req, res) => {
  Person.create(req.body, (err, data) => {
    err ? console.log(err) : res.send(data);
  });
});

//Use model.find() to Search Your Database
router.get("/getAll", (req, res) => {
  Person.find((err, data) => {
    err ? console.log(err) : res.send(data);
  });
});
module.exports = router;


//Use model.findOne() to Return a Single Matching Document from Your Database
router.get("/getOne", (req, res) => {
  Person.findOne({ favoriteFoods: "Salad" }, (err, data) => {
    err ? console.log(err) : res.send(data);
    console.log(data);
  });
});


//Use model.findById() to Search Your Database By _id
router.get("/getPersonById/:id", (req, res) => {
  Person.findById({ _id: req.params.id }, (err, data) => {
    err ? console.log(err) : res.send(data);
    console.log(data);
  });
});


//Perform Classic Updates by Running Find, Edit, then Save
router.put("/updPerson/:id", (req, res) => {
  Person.findById({ _id: req.params.id }, (err, data) => {
    err ? console.log(err) : data.favoriteFoods.push("hamburger");
    data.save();
    res.send(data);
  });
});


//Perform Classic Updates by Running Find, Edit, then Save
router.put("/updAge/:name", (req, res) => {
  Person.findOneAndUpdate(
    { name: req.params.name },
    { age: 20 },
    (err, data) => {
      if (err) {
        return console.log("Something wrong when updating record!");
      }
      res.send(data);
    }
  );
});


//Delete One Document Using model.findByIdAndRemove
router.delete("/delete/:id", (req, res) => {
  Person.findByIdAndRemove({ _id: req.params.id }, (err, data) => {
    err ? console.log(err) : res.json({ msg: "Person was deleted " });
  });
});


//MongoDB and Mongoose - Delete Many Documents with model.remove()
router.delete("/removeByName", (req, res) => {
  Person.remove({ name: "Mary" }, (err, data) => {
    err
      ? console.log(err)
      : res.json({ msg: "All Persons with Mary name are deleted" });
  });
});



//Chain Search Query Helpers to Narrow Search Results
router.get("/Query", (req, res) => {
  Person.find({ favoriteFoods: "Pizza" })
    .sort({ name: "desc" })
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return console.log(err);
      res.json(data);
    });
});