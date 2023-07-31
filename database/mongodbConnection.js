const mongoose = require("mongoose");
const chalk = require("chalk");
require("dotenv").config();

const connect = () => {

	mongoose.set("strictQuery", true);

	mongoose.connect(process.env.MONGO_URL, {
		dbName : process.env.DB_NAME
	})

	mongoose.Promise = Promise;

	// Database connection events
	// When successfully connected
	mongoose.connection.on("connected", () => {
		console.log(chalk.green(`Mongoose default connection open for worker ${process.pid}`));	});

	// If the connection throws an error
	mongoose.connection.on("error", (err) => {
		console.log(chalk.red(`Mongoose default connection error: ${err}`));
	});

	// When the connection is disconnected
	mongoose.connection.on("disconnected", () => {
		console.log(chalk.yellow(`Mongoose default connection disconnected for worker ${process.pid}`));
	});

	// If the Node process ends, close the Mongoose and Redis connection
	process.on("SIGINT", () => {
		mongoose.connection.close(() => {
			console.log(chalk.yellow("Mongoose default connection disconnected through app termination"));
			// eslint-disable-next-line no-process-exit
			process.exit();
		});
	});

}

module.exports = connect();