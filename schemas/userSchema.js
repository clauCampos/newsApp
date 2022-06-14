import {generateError} from "../helpers/generateError.js";
import Joi from "joi";

const signInUserSchema = Joi.object({

    nick_name: Joi.string().required()
        .min(3).max(100)
        .error(
            generateError(
                "nick name is a required field and must be between 3 and 100 characters", 400)
        ),

    email: Joi.string().required()
        .min(6).max(100)
        .email()
        .error(
            generateError(
                "Email is a required field, must be between 6 and 100 characters and must have an email format",
                400)
        ),

    password: Joi.string().required()
        .min(6).max(100)
        .error(
            generateError(
                "Password is a required field and must be at least 6 characters", 400)
        ),

    bio: Joi.string()
        .min(10).max(200)
        .error(generateError("Bio must be at least 10 chars and 200 characters", 400)),

    avatar: Joi.string()
        .min(5).max(200)
        .regex(/.jpg$/)
        .error(generateError("Avatar must be a valid format image(.jpg)", 400)),
});

export {signInUserSchema}