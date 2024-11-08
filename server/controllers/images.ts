import { Request, Response } from "express";
import { SERVER_URL } from "../constants";

export const uploadImageController = async (req: Request, res: Response) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" });
		}
		const { filename, originalname, mimetype, size } = req.file;
		console.log({ filename, originalname, mimetype, size });
		return res
			.status(200)
			.json({ imageUrl: `${SERVER_URL}/uploads/${filename}` });
	} catch (error) {
		console.log(error);
	}
};
