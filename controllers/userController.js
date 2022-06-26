import {findUserByEmail, findUserByNickName, insertUser} from "../repositories/userRepository.js";
import bcrypt, {hash} from "bcrypt";
import jsonwebtoken from 'jsonwebtoken'
import {bodyUserSchema} from "../schemas-validation/userSchema.js";
import {processImage, saveUserImage} from "../helpers/handleImage.js";
import { photoSchema } from "../schemas-validation/photoSchema.js";

const addUser = async (request, response, next) => {
    try {

        await bodyUserSchema.validateAsync(request.body);
        const {nick_name: nick, email, bio, password} = request.body;

        const emailResult = await findUserByEmail(email);
        const nickNameResult = await findUserByNickName(nick)

        if ((emailResult.length !== 0) || (nickNameResult.length !== 0)) {
            response.status(404).send({status: "error", message: "already exists user with that email or nick name"})
        }
        const encryptedPassword = await hash(password, 10)

        let avatar = null;
        if (request.files?.avatar) {
            await photoSchema.validateAsync(request.files.avatar.name)
            const image = await processImage(request.files?.avatar.data)
            await saveUserImage(image[0], image[1])
            avatar = image[0];
        }
        await insertUser(nick, email, bio, avatar, encryptedPassword);
        response.status(200).send({status: "ok", message: `new user created with email: ${email}`})

    } catch (error) {
        next(error)
    }
}

const loginUser = async (request, response, next) => {

    try {
        const {email, password} = request.body

        const user = await findUserByEmail(email)

        if (user.length === 0) {
            response.status(400).send({status: "error", message: `Wrong email or password`})
        }

        const encryptedPassword = user[0]?.password
        const isLoginValid = await bcrypt.compare(password, encryptedPassword)

        if (!isLoginValid) {
            response.status(400).send({status: "error", message: `Wrong email or password`})
        }

        const tokenPayload = {
            id: user[0].id,
        };
        const token = jsonwebtoken.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        response.status(200).send({status: "ok", message: `Correct login, token: ${token}`})

    } catch (error) {
        next(error)
    }
}

export {addUser, loginUser}