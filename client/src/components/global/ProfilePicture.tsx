import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type ProfilePictureProps = {
  img_url?: string;
  className?: string;
};

export function ProfilePicture({ img_url, className }: ProfilePictureProps) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={img_url || "https://github.com/shadcn.png"}
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
