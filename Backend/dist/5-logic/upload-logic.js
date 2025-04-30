"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = uploadImage;
exports.deleteImage = deleteImage;
const cloudinary_1 = __importDefault(require("../2-utils/cloudinary"));
async function uploadImage(filePath) {
    const result = await cloudinary_1.default.uploader.upload(filePath, {
        folder: "vacation-project",
    });
    return result.secure_url;
}
async function deleteImage(imageUrl) {
    try {
        const parts = imageUrl.split("/");
        const publicIdWithExtension = parts[parts.length - 1];
        const publicId = "vacation-project/" + publicIdWithExtension.split(".")[0];
        await cloudinary_1.default.uploader.destroy(publicId);
    }
    catch (err) {
        console.error("Error deleting image from Cloudinary:", err);
    }
}
