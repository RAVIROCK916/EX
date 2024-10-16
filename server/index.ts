import express, { type Request, type Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth";
import usersRouter from "./routes/users";

import { logger } from "./middleware/logger";

import { CLIENT_URL } from "./constants";

// app
const app = express();

// middleware
app.use(cors({ origin: CLIENT_URL, credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(logger);

// port
const PORT = 3000;

// server routes
app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
	console.log("Server is running on port 3000");
});
