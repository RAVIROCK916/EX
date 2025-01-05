import pg from "pg";

const connectionString = process.env.DB_CONNECTION_STRING;

const db = new pg.Pool({
	connectionString,
	connectionTimeoutMillis: 60000,
});

db.connect()
	.then(() => {
		console.log("Connected to database");
	})
	.catch((err) => {
		console.log("connectionString", connectionString);
		console.log("Error connecting to database", err);
	});

export default db;
