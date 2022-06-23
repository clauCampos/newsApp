import {generateError} from "../helpers/generateError.js";
import Joi from "joi";

const bodyUserSchema = Joi.object({

    nick_name: Joi.string().required()
        .min(3).max(100)
        .error(generateError(
            "Nick name is a required field and must be between 3 and 100 characters.", 400)),

    email: Joi.string().required()
        .min(6).max(100)
        .email()
        .error(generateError(
            "Email is a required field, must be between 6 and 100 characters and must have an email format.",
            400)),

    password: Joi.string().required()
        .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/)
        .error(generateError(
            "Password is a required field and must contain at least one letter and one number (between 8-20 characters).", 400)),
           
    bio: Joi.string()
        .min(10).max(200)
        .error(generateError("Bio must be between 10 and 200 characters.", 400)),

});

export {bodyUserSchema}