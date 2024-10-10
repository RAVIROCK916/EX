import express, { type Request, type Response } from "express";
import cors from "cors";

import authRouter from "./routes/auth";
import bodyParser from "body-parser";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
	console.log("Server is running on port 3000");
});
