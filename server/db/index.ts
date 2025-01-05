import pg from "pg";

const connectionString = process.env.DB_CONNECTION_STRING;

const db = new pg.Pool({
	connectionString,
});

db.connect()
	.then(() => {
		console.log("Connected to database");
	})
	.catch((err) => {
		console.log("Error connecting to database", err);
	});

export default db;
