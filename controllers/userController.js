import {findUserByEmail, findUserByNickName, insertUser} from "../repositories/userRepository.js";
import {hash} from "bcrypt";

const addUser = async (request, response, next) => {
    try {
        //VALIDATE DATA input(using JOI)
        const {nick_name: nick, email, bio, avatar, password} = request.body;
        console.log(nick, email, bio, avatar, password)

        const emailResult = await findUserByEmail(email);
        const nickNameResult = await findUserByNickName(nick)
        console.log(emailResult.length, nickNameResult.length)
        if ((emailResult.length !== 0) || (nickNameResult.length !== 0)) {
            response.status(404).send({
                status: "error",
                message: "already exists user with that email or nick name"
            })
        }
        const encryptedPassword = await hash(password, 10)
        await insertUser(nick, email, bio, avatar, encryptedPassword);
        response.status(200).send({status: "ok", message: `new user created with email: ${email}`})

    } catch (error) {
        next(error)
    }
}


export {addUser}