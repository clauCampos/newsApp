import {fileURLToPath} from 'url';
import path from "path";
import {mkdir} from "node:fs/promises";
const __dirname = fileURLToPath(import.meta.url);

export const photoPostPath = path.join(
    __dirname,
    "..", "..", "images",
    "upload-photos-posts");

export const photoUserPath = path.join(
    __dirname,
    "..", "..", "images",
    "upload-avatar-users")

const createFolderUser = async () => {
    await mkdir(photoUserPath, {recursive: true});
    return photoUserPath;
}

const createFolderPost = async () => {
    await mkdir(photoPostPath, {recursive: true});
    return photoPostPath;

}

export const imageUserPath = await createFolderUser()
export const imagePostPath = await createFolderPost();

