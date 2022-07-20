import { photoPostPath, photoUserPath } from "./createFoldersToStoreFiles.js";
import { rename } from "node:fs/promises";

const moveImage = async(originalImage, movedImage) => {
  try {
    await rename(originalImage, movedImage)
  } catch (error) {
    console.log(error);
  }
};

moveImage(`default-images/default-post-image.jpg`, photoPostPath + "/default-image.jpg");
moveImage(`default-images/default-user-avatar.jpg`, photoUserPath + "/default-avatar.jpg");
