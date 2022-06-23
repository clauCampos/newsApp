import {generateError} from "../helpers/generateError.js";
import Joi from "joi";

export const photoSchema = Joi.string()
    .min(5).max(200)
    .regex(/.(jpe?g|png|JPE?G|PNG)$/)
    .error(generateError("Photo must be a valid format image(.jpg, .jpeg or .png ).", 400))    