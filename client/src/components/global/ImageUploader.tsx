import { useRef } from "react";

import { Trash, Images } from "lucide-react";
import { Button } from "../ui/button";
import { IKContext, IKUpload } from "imagekitio-react";
import { SERVER_URL } from "@/constants";

type Props = {
  value: string | null;
  handleImageUrl: (imageUrl: string | null) => void;
};

const ImageUploader = ({ value, handleImageUrl }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;
  const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
  const authenticator = async () => {
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

  const onError = (err: any) => {
    console.log("Error", err);
  };

  const onSuccess = (res: any) => {
    console.log("Success", res);
    handleImageUrl(res.url);
  };

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const removeImage = () => {
    handleImageUrl(null);
  };

  return (
    <div className="flex h-80 cursor-pointer flex-col items-center justify-center gap-y-4 rounded-md bg-neutral-900">
      {value ? (
        <figure className="group relative overflow-hidden rounded-md">
          <img
            src={value}
            alt="uploaded image"
            className="h-full w-full object-contain"
          />
          <span
            onClick={removeImage}
            className="absolute right-4 top-4 hidden rounded-md bg-neutral-500 p-1.5 transition-all hover:bg-neutral-400 group-hover:block"
          >
            <Trash className="size-4" />
          </span>
        </figure>
      ) : (
        <IKContext
          urlEndpoint={urlEndpoint}
          publicKey={publicKey}
          authenticator={authenticator}
        >
          <Images size={64} strokeWidth="1" />
          <h3 className="text-sm font-medium md:text-lg">
            Drag and drop your photos here
          </h3>
          <p className="text-sm text-neutral-500">SVG, PNG, JPG, GIF</p>
          <Button variant="secondary" className="" onClick={handleUpload}>
            Upload
          </Button>
          <IKUpload
            ref={inputRef}
            className="hidden"
            useUniqueFileName={true}
            folder="/posts"
            onError={onError}
            onSuccess={onSuccess}
          />
        </IKContext>
      )}
    </div>
  );
};
export default ImageUploader;
