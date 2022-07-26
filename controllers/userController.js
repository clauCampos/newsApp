import {
  insertUser,
  findUserByEmail,
  findUserByNickName,
  findUserById,
  selectUserByActivationCode,
  deleteRegistrationCode,
  removeUser,
} from "../repositories/userRepository.js";
import bcrypt, { hash } from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { bodyUserSchema } from "../schemas-validation/userSchema.js";
import { processImage, saveUserImage } from "../helpers/handleImage.js";
import { photoSchema } from "../schemas-validation/photoSchema.js";
import { generateError } from "../helpers/generateError.js";
import { sendMail } from "../helpers/sendMail.js";

const registerUser = async (request, response, next) => {
  try {
    await bodyUserSchema.validateAsync(request.body);
    const { nick_name: nick, email, bio, password } = request.body;

    const emailResult = await findUserByEmail(email);
    const nickNameResult = await findUserByNickName(nick);
  
    let avatar = null;

    if (emailResult) {
      throw generateError(`Already exists an user with that email.`, 404);

    } else if (nickNameResult) {
      throw generateError(`Already exists an user with that nick name.`, 404);
    
    } else if (request.files?.avatar) {
      await photoSchema.validateAsync(request.files.avatar.name);
      const image = await processImage(request.files?.avatar.data);
      await saveUserImage(image[0], image[1]);
      avatar = image[0];
    }

    const encryptedPassword = await hash(password, 10);
    const registrationCode = uuidv4();

    const insertId = await insertUser({
      nick,
      email,
      encryptedPassword,
      bio,
      avatar,
      registrationCode,
    });

    const { SERVER_PORT, DATABASE_HOST } = process.env;

    await sendMail(
      "¡Welcome to COLLECTIVE NEWS PROJECT!",
      `
          <p>Activate your account here:</p>
          
          <a href="http://${DATABASE_HOST}:${SERVER_PORT}/api/v1/user/activate/${registrationCode}">Activate</a>
          `,
      email
    );

    response.status(201).send({ status: "ok", data: { id: insertId } });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (request, response, next) => {
  try {
    const { email, password } = request.body;

    const user = await findUserByEmail(email);
  
    if (!user) {
      throw generateError(`Wrong email or password.`, 400);
    }else if(user.registration_code){
      throw generateError(`Must activate your account.`, 400);
    }
  

    const encryptedPassword = user.password;
    const isLoginValid = await bcrypt.compare(password, encryptedPassword);

    if (!isLoginValid) {
      throw generateError(`Wrong email or password.`, 400);
    }

    const tokenPayload = {
      id: user.id,
    };
    const token = jsonwebtoken.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    response
      .status(200)
      .send({ status: "ok", message: `Correct login, token: ${token}`, token: token });
  } catch (error) {
    next(error);
  }
};

const activateUser = async (request, response, next) => {
  try {
    const { registrationCode } = request.params;

    const user = await selectUserByActivationCode(registrationCode);

    if (!user) {
      throw generateError(
        "Invalid registration code or user already activated!",
        404
      );
    }

    await deleteRegistrationCode(user.id);

    response.status(200).send({ status: "ok", message: "User activated!" });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (request, response, next) => {
  try {
    const { userID } = request.params;

    const affectedRows = await removeUser(userID);

    if (affectedRows === 0) {
      throw generateError("User does not exist!", 404);
    }

    response.status(200).send({ status: "ok", message: "User deleted!" });
  } catch (error) {
    next(error);
  }
};

const getProfile = async (request, response, next) => {
  try {
      const { id } = request.auth; 
      
      const user = await findUserById(id)

      response.status(200).send({ status: "ok", data: user }); 
    } catch (error) {
      next(error);
    }
  };

export { registerUser, loginUser, activateUser, deleteUser, getProfile };