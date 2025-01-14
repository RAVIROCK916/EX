import { SERVER_URL } from "@/constants";

export const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
export const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
export const authenticator = async () => {
  try {
    const response = await fetch(`${SERVER_URL}/images/auth`);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`,
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;
    return { signature, expire, token };
  } catch (error: any) {
    throw new Error(`Authentication request failed: ${error.message}`);
  }
};

export const onError = (err: any) => {
  console.log("Error", err);
};

export const onSuccess = (res: any) => {
  console.log("Success", res);
};
