import { Request, Response } from "express";
import imagekit from "../lib/imagekit";
import { IMAGEKIT_URL_ENDPOINT } from "../constants";

export const imagekitAuthController = async (req: Request, res: Response) => {
	const result = await imagekit.getAuthenticationParameters();
	res.status(200).json(result);
};

export const uploadImageController = async (req: Request, res: Response) => {
	try {
		if (!req.file) {
			return res.status(400).json({ message: "No file uploaded" });
		}

		const { originalname, buffer } = req.file;
		const base64Image = buffer.toString("base64");

		console.log("3. Starting ImageKit upload");
		const result = imagekit
			.upload({
				file: base64Image,
				fileName: originalname,
				folder: "/posts",
			})
			.then((response) => {
				console.log("4. ImageKit upload response:", response);
			})
			.catch((error) => {
				console.log("4. ImageKit upload error:", error);
				return res.status(500).json({ error: "Error uploading image" });
			})
			.finally(() => {
				console.log("4. Donno what to do here");
			});

		console.log("5. Upload completed:");

		return res.status(200).json({
			success: true,
			imageUrl: `${IMAGEKIT_URL_ENDPOINT}posts/${originalname}`,
		});
	} catch (error) {
		console.log("Upload Controller Error:", error);
		return res.status(500).json({ error: "Error uploading image" });
	}
};
