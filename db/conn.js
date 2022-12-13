const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(err => {
        _db = client.db("vis30k");
        console.log("Successfully connected to MongoDB."); 
      });
  },
 
  getDb: function () {
    return _db;
  },
};