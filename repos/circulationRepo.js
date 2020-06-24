const { MongoClient } = require('mongodb');

function circulationRepo() {
	const url = 'mongodb://localhost:27017';
	const dbName = 'circulation';

	function get() {
		return new Promise(async (resolve, reject) => {
			const client = new MongoClient(url);
			try {
				await client.connect();
				const items = db.collection('newspapers').find();

				resolve(await items.toArray());
			} catch (error) {
				reject(error);
			}
		});
	}

	function loadData(data) {
		return new Promise(async (resolve, reject) => {
			// For each new operation, there needs to be a new
			// instance of MongoClient and a new connection
			const client = new MongoClient(url);
			try {
				await client.connect();
				const db = client.db(dbName);

				// Populating the db circulation with a document (collection)
				// coming from newspapers.json
				results = await db.collection('newspapers').insertMany(data);
				resolve(results);
				client.close();

			{ catch (error) {
				reject(error);
			}
		})
	}

	// Object available with the loadData resolved result or rejected error
	return { loadData, get }
}
