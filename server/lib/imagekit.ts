import ImageKit from "imagekit";

const imagekit = new ImageKit({
	urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT as string,
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY as string,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
});

export default imagekit;
