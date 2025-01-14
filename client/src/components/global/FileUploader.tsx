import { Input } from "@/components";
import { authenticator, onError, publicKey, urlEndpoint } from "@/lib/imagekit";
import { IKContext, IKUpload } from "imagekitio-react";
import { useRef, useState } from "react";
import Image from "./Image";

type FileUploaderProps = {
  folder: string;
  onSuccess?: (res: any) => void;
};

const FileUploader = ({ folder, onSuccess }: FileUploaderProps) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const uploadRef = useRef<HTMLInputElement>(null);

  console.log(imageUrl);

  const handleClick = () => {
    if (!uploadRef.current) return;
    uploadRef.current?.click();
  };

  const handleSuccess = (res: any) => {
    setImageUrl(res.url);
    onSuccess?.(res);
  };

  return (
    <IKContext
      urlEndpoint={urlEndpoint}
      publicKey={publicKey}
      authenticator={authenticator}
    >
      <IKUpload
        ref={uploadRef}
        className="hidden"
        useUniqueFileName={true}
        folder={folder}
        onSuccess={handleSuccess}
        onError={onError}
      />
      {imageUrl ? (
        <Image
          src={imageUrl}
          width={200}
          height={200}
          alt="uploaded image"
          className="rounded-md border border-neutral-400"
        />
      ) : (
        <Input type="file" onClick={handleClick} />
      )}
    </IKContext>
  );
};
export default FileUploader;
