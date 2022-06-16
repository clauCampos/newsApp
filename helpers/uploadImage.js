import path from "path";
import {fileURLToPath} from 'url';
import fs from "fs/promises";
import sharp from "sharp";
import { v4 as uuidv4 } from 'uuid';
const __dirname = fileURLToPath(import.meta.url);
const imageUploadPath = path.join(
    __dirname,
    "..",
    "uploads-photos"
);

export const processAndSaveImage = async (imageBuffer) => {
    await fs.mkdir(imageUploadPath, { recursive: true });

    const image = sharp(imageBuffer);
    const imageMetaData = await image.metadata();

    if (imageMetaData.width > 1000) {
        image.resize(1000);
    }

    const imageFileName = `${uuidv4()}.${imageMetaData.format}`;
    console.log(imageFileName)
    await image.toFile(path.join(imageUploadPath, imageFileName));

    return imageFileName;
};