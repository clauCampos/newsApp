import {findUserByEmail, findUserByNickName, insertUser} from "../repositories/userRepository.js";
import bcrypt, {hash} from "bcrypt";
import jsonwebtoken from 'jsonwebtoken'
import {bodyUserSchema} from "../schemas-validation/userSchema.js";
import {processImage, saveUserImage} from "../helpers/handleImage.js";
import { photoSchema } from "../schemas-validation/photoSchema.js";
import {generateError} from "../helpers/generateError.js";

const addUser = async (request, response, next) => {
    try {

        await bodyUserSchema.validateAsync(request.body);
        const {nick_name: nick, email, bio, password} = request.body;

        const emailResult = await findUserByEmail(email);
        const nickNameResult = await findUserByNickName(nick);
        let avatar = null;

        if (emailResult.length !== 0) {
            throw generateError(`Already exists a user with that email.`, 404);
        
        }else if (nickNameResult.length!== 0)  {
            throw generateError(`Already exists a user with that nick name.`, 404);
      
        }else if (request.files?.avatar) {
            await photoSchema.validateAsync(request.files.avatar.name)
            const image = await processImage(request.files?.avatar.data)
            await saveUserImage(image[0], image[1])
            avatar = image[0];
        }
        if (emailResult.length === 0 && nickNameResult.length === 0) {
            const encryptedPassword = await hash(password, 10)
            await insertUser(nick, email, bio, avatar, encryptedPassword);
            response.status(200).send({status: "ok", message: `new user created with email: ${email}`})
        }
    } catch (error) {
        next(error)
    }
}

const loginUser = async (request, response, next) => {

    try {
        const {email, password} = request.body

        const user = await findUserByEmail(email)

        if (user.length === 0) {
            throw generateError(`Wrong email or password.`, 400);
        }

        const encryptedPassword = user[0]?.password
        const isLoginValid = await bcrypt.compare(password, encryptedPassword)

        if (!isLoginValid) {
            throw generateError(`Wrong email or password.`, 400);

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