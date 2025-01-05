import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfilePictureProps = {
  img_url?: string;
  alt?: string;
  className?: string;
};

export function ProfilePicture({
  img_url,
  alt,
  className,
}: ProfilePictureProps) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={img_url || "https://github.com/shadcn.png"}
        alt={alt || "Avatar"}
        className="cursor-pointer object-cover hover:opacity-80"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
