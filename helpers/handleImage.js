import path from "path";
import {imagePostPath} from "./createFoldersToStoreFiles.js";
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';

const processImage = async (imageBuffer) => {
    const image = sharp(imageBuffer);
    const imageMetaData = await image.metadata();

    if (imageMetaData.width > 1000) {
        image.resize(1000);
    }
    const imageFileName = `${uuidv4()}.${imageMetaData.format}`;
    return [imageFileName, image]
}
const savePostImage = async (imageFileName, image) => {
    await image.toFile(path.join(imagePostPath, imageFileName));
}

export {processImage, savePostImage}