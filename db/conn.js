const { MongoClient } = require("mongodb");
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    MongoClient.connect(process.env.ATLAS_URI,{ useUnifiedTopology: true, useNewUrlParser: true, })
      .then((client,err)=>{
      _db =client.db("vis30k");
      console.log("Successfully connected to MongoDB."); 
   })
  //   client.connect(function (err, db) {
  //     // Verify we got a good "db" object
  //     if (db)
  //     {
  //       _db = db.db("vis30k");
  //       console.log("Successfully connected to MongoDB."); 
  //     }
  //     return callback(err);
  //        });
  },
 
  getDb: function () {
    return _db;
  },
};