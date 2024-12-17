import protectedAPI from "@/lib/axios/auth";

export default async function uploadFile(file: File) {
  const fileData = new FormData();
  fileData.append("image", file as File);

  try {
    const res = await protectedAPI.post(`/images/upload`, fileData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.imageUrl;
  } catch (error) {
    console.log(error);
  }
}
