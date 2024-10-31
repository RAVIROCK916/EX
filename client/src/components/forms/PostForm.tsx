import { useState } from "react";

import { z } from "zod";

import ImageUploader from "../global/FileUploader";

import { Button, Input, Label, Textarea } from "@/components";
import { toast } from "sonner";

import { SERVER_URL } from "@/constants";
import protectedAPI from "@/lib/axios/auth";
import { useNavigate } from "@tanstack/react-router";

const PostForm = () => {
  const [caption, setCaption] = useState<string>("");
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const formData = { caption, image };

  const formSchema = z.object({
    caption: z.string().min(1, "Caption is required"),
    image: z.string().url().nullable().optional(),
  });

  const fileSchema = z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, {
      message: "File size should be 5MB or less",
    })
    .refine(
      (file) =>
        ["image/png", "image/jpeg", "image/gif", "image/svg+xml"].includes(
          file.type,
        ),
      {
        message: "Only .png, .jpg, .gif and .svg files are allowed",
      },
    );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ formData });

    // form validation
    const formValidation = formSchema.safeParse(formData);

    if (!formValidation.success) {
      formValidation.error.errors.forEach((error) => {
        console.log(error.message);

        toast.error(error.message);
      });
      return;
    }

    // image validation
    const fileValidation = fileSchema.safeParse(file);
    if (!fileValidation.success) {
      toast.error(fileValidation.error.message);
      return;
    }

    setIsSubmitting(true);

    // upload image to server
    const fileData = new FormData();
    fileData.append("image", file as File);

    try {
      const res = await protectedAPI.post(
        `${SERVER_URL}/images/upload`,
        fileData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      formData.image = res.data.imageUrl;
    } catch (error) {
      console.log(error);
    }

    // submit post to server

    try {
      await protectedAPI.post(`${SERVER_URL}/posts`, formData);
    } catch (err) {
      console.log(err);
      return;
    } finally {
      setIsSubmitting(false);
    }

    toast.success("Post added!");
    navigate({ to: "/", replace: true });
  };

  return (
    <form className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="caption">Caption</Label>
        <Textarea
          id="caption"
          className="h-24 bg-neutral-900"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption for your post"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">Add Photos</Label>
        <ImageUploader image={image} setImage={setImage} setFile={setFile} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="tags">Add Tags</Label>
        <Input
          id="tags"
          className="bg-neutral-900 duration-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          placeholder="Travel, Nature, Beach, Mountains..."
        />
      </div>
      <div className="flex justify-end gap-x-6">
        <Button className="" variant="ghost">
          Cancel
        </Button>
        <Button
          className={`w-20 ${isSubmitting && "cursor-not-allowed"}`}
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Post
        </Button>
      </div>
    </form>
  );
};
export default PostForm;
