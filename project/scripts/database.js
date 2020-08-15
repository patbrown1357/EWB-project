async function main() {
  const MongoClient = require('mongodb').MongoClient;
  const uri = "";
  const client = new MongoClient(uri, { useUnifiedTopology: true });

  try {
    await client.connect();
    await listDatabases(client);
    client.db("Locations").collection("gmap_test").insertOne({
      item: "test",
      coords: "here",
      capacity: 128
    });
  } catch(e) {
    console.error(e);
  } finally {
    await client.close()
  }
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

async function upCount(client, placeId) {

  const cursor = client.db("Locations").collection("gmap_test").find({placeId:placeId}).limit(1);

  if( cursor.count() > 0 ) {
    collection.update(
      {placeId:placeId},
      {$set: {count:(cursor.count+1)}
    });
  }
}

async function decCount(client, placeId) {
  onst cursor = client.db("Locations").collection("gmap_test").find({placeId:placeId}).limit(1);

  if( cursor.count() > 0 ) {
    collection.update(
      {placeId:placeId},
      {$set: {count:(cursor.count-1)}
    });
  }
}


main().catch(console.error);
