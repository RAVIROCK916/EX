import express, { type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import authRouter from "./routes/auth";

import { logger } from "./middleware/logger";

import { CLIENT_URL } from "./constants";

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(logger);

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log("Server is running on port 3000");
});
