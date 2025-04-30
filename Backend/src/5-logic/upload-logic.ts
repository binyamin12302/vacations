import cloudinary from "../2-utils/cloudinary";

export async function uploadImage(filePath: string) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: "vacation-project",
  });

  return result.secure_url;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  try {
    const parts = imageUrl.split("/");
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = "vacation-project/" + publicIdWithExtension.split(".")[0];

    await cloudinary.uploader.destroy(publicId);
  } catch (err) {
    console.error("Error deleting image from Cloudinary:", err);
  }
}
