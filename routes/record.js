const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

recordRoutes.get('/', (req, res) => {
  res.json({
      hello: 'hi',
  })
})

// This section will help you get all records
recordRoutes.route("/annotation").get(function (req, res) {
  let db_connect = dbo.getDb("vis30k");
  db_connect
    .collection("annotation")
    .find({})
    .sort({ id: 1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // This section will help you get all records by one user
recordRoutes.route("/annotation/:user").get(function (req, res) {
  let db_connect = dbo.getDb("vis30k");
  db_connect
    .collection("annotation")
    .find({ user: req.params.user })
    .sort({ id: 1 })
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
// This section will help you get a single record by index and username
recordRoutes.route("/annotation/:id/:user").get(function (req, res) {
 let db_connect = dbo.getDb("vis30k");
 let recordquery = { $and: [{id: parseInt(req.params.id)}, {user: req.params.user}] };
 db_connect
   .collection("annotation")
   .findOne(recordquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/add").post(function (req, response) {
 let db_connect = dbo.getDb("vis30k");
 let annotation = {
   id: req.body.id,
   user: req.body.user,
   imageId: req.body.imageId,
   colour: req.body.colour,
   use: req.body.use,
   legend: req.body.legend,
   maptype: req.body.maptype,
   number: req.body.number,
   difficulty: req.body.difficulty,
 };
 db_connect.collection("annotation").insertOne(annotation, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id/:user").post(function (req, response) {
 let db_connect = dbo.getDb("vis30k");
 let myquery = { $and: [{id: parseInt(req.params.id)}, {user: req.params.user}] };
 let newvalues = {
   $set: {
    imageId: req.body.imageId,
    colour: req.body.colour,
    use: req.body.use,
    legend: req.body.legend,
    maptype: req.body.maptype,
    number: req.body.number,
    difficulty: req.body.difficulty,
   },
 };
 db_connect
   .collection("annotation")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 annotation updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
// recordRoutes.route("/:id").delete((req, response) => {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
//    if (err) throw err;
//    console.log("1 document deleted");
//    response.json(obj);
//  });
// });
 
module.exports = recordRoutes;