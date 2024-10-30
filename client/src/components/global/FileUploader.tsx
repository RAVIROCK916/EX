import { useRef } from "react";

import { Images } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
};

const FileUploader = ({ image, setImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.target.files?.[0];
    if (image) {
      setImage(URL.createObjectURL(image));
    }
  };

  console.log(image);

  return (
    <div className="flex h-80 cursor-pointer flex-col items-center justify-center gap-y-4 rounded-md bg-neutral-900">
      {image ? (
        <img
          src={image}
          alt="uploaded image"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <>
          <Images size={64} strokeWidth="1" />
          <h3 className="text-lg font-medium">
            Drag and drop your photos here
          </h3>
          <p className="text-sm text-neutral-500">SVG, PNG, JPG, GIF</p>
          <Button variant="secondary" className="" onClick={handleUpload}>
            Upload
          </Button>
          <input
            type="file"
            className="hidden"
            ref={inputRef}
            onChange={handleImageChange}
          />
        </>
      )}
    </div>
  );
};
export default FileUploader;
