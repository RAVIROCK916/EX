import { IKImage } from "imagekitio-react";

type ImageProps = {
  src: string;
  width?: number;
  height?: number;
  alt: string;
  className?: string;
};

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT;

const Image = ({ src, width, height, alt, className }: ImageProps) => {
  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      src={src}
      width={width}
      height={height}
      alt={alt}
      className={className}
      lqip={{ active: true, quality: 20 }}
      loading="lazy"
    />
  );
};

export default Image;
