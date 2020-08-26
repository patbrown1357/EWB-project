import {'require'} from './scripts/require.js';
var MongoClient = require('mongodb').MongoClient;

async function connectDb() {


  const uri = "mongodb+srv://gmapjs:*Pw8C18EC@gmapjs-test.vqhbv.mongodb.net/<dbname>?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    await listDatabases(client);

  } catch(e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  databasesList.databases.forEach(db => document.getElementById("db").innerHTML += ` - ${db.name}` + "\n");
}

function upCount(client, placeId) {

  const cursor = client.db("Locations").collection("gmap_test").find({placeId:placeId}).limit(1);

  if( cursor.count() > 0 ) {
    collection.update(
      {placeId:placeId},
      {$set: {count:(cursor.count+1)}
    });
  } else {
    collection.save({
      placeId: placeId,
      count: 1
    })
  }
}

function decCount(client, placeId) {
  const cursor = client.db("Locations").collection("gmap_test").find({placeId:placeId}).limit(1);

  if( cursor.count() > 0 ) {
    collection.update(
      {placeId:placeId},
      {$set: {count:(cursor.count-1)}
    });
  }
}
