import { Input } from "@/components";
import { ChangeEvent } from "react";

type FileUploaderProps = {
  handleFile: (file: File) => void;
};

const FileUploader = ({ handleFile }: FileUploaderProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };
  return <Input type="file" onChange={handleChange} />;
};
export default FileUploader;
