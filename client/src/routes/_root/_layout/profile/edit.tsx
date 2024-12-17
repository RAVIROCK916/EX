import {
  createFileRoute,
  Link,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Link as LinkIcon } from "lucide-react";
import {
  Button,
  Input,
  Label,
  Textarea,
  DatePicker,
  FileUploader,
} from "@/components";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import protectedAPI from "@/lib/axios/auth";
import { toast } from "sonner";
import uploadFile from "@/utils/uploadFile";

export const Route = createFileRoute("/_root/_layout/profile/edit")({
  component: EditProfilePage,
});

enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other",
}

function EditProfilePage() {
  const navigate = useNavigate();

  const [images, setImages] = useState<{
    profileImage: File | null;
    coverImage: File | null;
  }>({
    profileImage: null,
    coverImage: null,
  });

  console.log({ images });

  const handleProfileImage = (image: File | null) => {
    setImages({ ...images, profileImage: image });
  };

  const handleCoverImage = (image: File | null) => {
    setImages({ ...images, coverImage: image });
  };

  const profile = useRouterState({ select: (s) => s.location.state.profile });

  const [form, setForm] = useState<FormData>({
    name: profile?.name || undefined,
    email: profile?.email || undefined,
    bio: profile?.bio || undefined,
    gender: (profile?.gender as Gender) || undefined,
    birth_date: profile?.birth_date || undefined,
    location: profile?.location || undefined,
    personal_link: profile?.personal_link || undefined,
    profile_picture_url: profile?.profile_picture_url || undefined,
    cover_picture_url: profile?.cover_picture_url || undefined,
  });

  const formSchema = z.object({
    name: z.string().min(3, "Name should be at least 3 characters").optional(),
    email: z.string().email("Invalid email").optional(),
    bio: z.string().optional(),
    gender: z.nativeEnum(Gender).optional(),
    birth_date: z.string().optional(),
    location: z.string().optional(),
    personal_link: z.string().url("Invalid URL").optional(),
    profile_picture_url: z
      .string()
      .url("Please upload proper profile image")
      .optional(),
    cover_picture_url: z.string().url("Invalid URL").optional(),
  });

  type FormData = z.infer<typeof formSchema>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDateSelect = (_: any, selectedDay: Date) => {
    setForm((prev) => ({ ...prev, birth_date: selectedDay.toISOString() }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(form);

    // validate form
    const formValidation = formSchema.safeParse(form);
    if (!formValidation.success) {
      formValidation.error.errors
        .slice()
        .reverse()
        .forEach((error: z.CustomErrorParams) => {
          toast.error(`${error.path}: ${error.message}`);
        });
      return;
    }

    // upload images
    if (!images.profileImage) {
      toast.error("Please upload profile image");
      return;
    }

    const profileImageUrl = await uploadFile(images.profileImage);
    form.profile_picture_url = profileImageUrl;

    if (images.coverImage) {
      const coverImageUrl = await uploadFile(images.coverImage);
      form.cover_picture_url = coverImageUrl;
    }

    // submit form

    try {
      await protectedAPI.post(`/users/profile/save`, form);
      navigate({ to: "/profile" });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="space-y-6">
      <h1>Edit Profile</h1>
      <form className="space-y-4 *:space-y-2">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe..."
            value={form.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="johndoe@gmail.com"
            value={form.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            placeholder="Tell us about yourself..."
            id="bio"
            name="bio"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
            rows={4}
            maxLength={1000}
            className="max-h-80"
          />
        </div>
        <div>
          <Label>Gender</Label>
          <Select
            value={form.gender}
            onValueChange={(val: string) =>
              setForm({ ...form, gender: val as Gender })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Birth Date</Label>
          <DatePicker
            date={form.birth_date || ""}
            onDateSelect={handleDateSelect}
            maxDate={new Date()}
          />
        </div>
        <div>
          <Label>Profile Picture</Label>
          <FileUploader handleFile={handleProfileImage} />
        </div>
        <div>
          <Label>Cover Picture</Label>
          <FileUploader handleFile={handleCoverImage} />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            name="location"
            value={form.location}
            onChange={handleInputChange}
            placeholder="Your location..."
          />
        </div>
        <div>
          <Label htmlFor="personal_link">Personal Link</Label>
          <div className="relative">
            <span className="absolute bottom-0 left-0 top-0 rounded-l-md bg-neutral-50 p-3">
              <LinkIcon className="h-4 w-4 text-black" />
            </span>
            <Input
              id="personal_link"
              name="personal_link"
              type="url"
              placeholder="https://..."
              value={form.personal_link}
              onChange={handleInputChange}
              className="pl-12"
            />
          </div>
        </div>
        <div className="!mt-6 flex items-center justify-end gap-4">
          <Link to="/profile">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button className="!mt-0" type="submit" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}
