// Importing mongodb to have an instance available as an object
const MongoClient = require('mongodb').MongoClient;

const assert = require('assert');

const circulationRepo = require('./repos/circulationRepo');
const data = require('./circulation.json');

// Connection URL, this can be a local one or the one from Mongo Atlas
// Depends on how you installed MongoDB, as a local instance or as a service
const url = 'mongodb://localhost:27017';

// DB Name
const dbName = 'circulation';

async function main() {
	// Creating an instance with the URL to use
	const client = new MongoClient(url);
	await client.connect();

	try {
		// Loading the file with the CRUD operations to follow along
        	const results = await circulationRepo.loadData(data);
        	// results.ops shows the actual data being pulled from the collection
        	assert.equal(data.length, results.insertedCount);

        	// Method from the circulation method to execute the GET CRUD procedure
        	const getData = await circulationRepo.get();
        	// results.ops shows the actual data being pulled from the collection
        	assert.equal(data.length, results.insertedCount);
	} catch (error) {
		console.log(error);
	} finally {
		// Admin class in an internal class that allows convenient
        	// access to the admin functionality and commands for MongoDB
        	const admin = client.db(dbName).admin();

        	// Will drop the database to prevent the database from overpopulating with the same insert procedure
        	await client.db(dbName).dropDatabase();
        	console.log(await admin.listDatabases());

        	client.close();
	}
}

main();
