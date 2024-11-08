import { useRef } from "react";

import { Trash, Images } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  value: string | null;
  handleImage: (image: string | null) => void;
  handleFile: (file: File) => void;
};

const ImageUploader = ({ value, handleImage, handleFile }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
      handleImage(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    handleImage(null);
  };

  return (
    <div className="flex h-80 cursor-pointer flex-col items-center justify-center gap-y-4 rounded-md bg-neutral-900">
      {value ? (
        <figure className="group relative overflow-hidden rounded-md">
          <img src={value} alt="uploaded image" className="object-cover" />
          <span
            onClick={removeImage}
            className="absolute right-4 top-4 hidden rounded-md bg-neutral-500 p-1.5 transition-all hover:bg-neutral-400 group-hover:block"
          >
            <Trash className="size-4" />
          </span>
        </figure>
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
export default ImageUploader;
