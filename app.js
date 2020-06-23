// Importing mongodb to have an instance available as an object
const MongoClient = require('mongodb').MongoClient;

// Connection URL, this can be a local one or the one from Mongo Atlas
// Depends on how you installed MongoDB, as a local instance or as a service
const url = 'mongodb://localhost:27017';

// DB Name
const dbName = 'circulation';

async function main() {
	// Creating an instance with the URL to use
	const client = new MongoClient(url);
	await client.connect();

	// Admin class in an internal class that allows convenient
	// access to the admin functionality and commands for MongoDB
	const admin = client.db(dbName).admin();
	console.log(await admin.serverStatus());
	console.log(await admin.listDatabases());

}

main();
