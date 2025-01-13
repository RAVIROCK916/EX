import { useState } from "react";

import { z } from "zod";

import ImageUploader from "../global/ImageUploader";

import { Button, Input, Label, Textarea } from "@/components";
import { toast } from "sonner";

import protectedAPI from "@/lib/axios/auth";
import { useNavigate } from "@tanstack/react-router";

const PostForm = () => {
  const [caption, setCaption] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const navigate = useNavigate();

  const formData = { caption, imageUrl };

  const formSchema = z.object({
    caption: z.string().min(1, "Caption is required"),
    imageUrl: z.string().url().nullable().optional(),
  });

  const handleImageUrl = (imageUrl: string | null) => {
    setImageUrl(imageUrl);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ formData });

    // form validation
    const formValidation = formSchema.safeParse(formData);

    if (!formValidation.success) {
      formValidation.error.errors.forEach((error) => {
        console.log(error.message);

        toast.error(`${error.path}: ${error.message}`);
      });
      return;
    }

    // submit post to server

    try {
      await protectedAPI.post(`/posts`, formData);
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
    <form className="space-y-6" onSubmit={handleSubmit}>
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
        <ImageUploader value={imageUrl} handleImageUrl={handleImageUrl} />
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
          type="submit"
          disabled={isSubmitting}
        >
          Post
        </Button>
      </div>
    </form>
  );
};
export default PostForm;
