import {generateError} from "../helpers/generateError.js";
import Joi from "joi";

const topics = ["sports", "politics", "finances"]

const createPostSchema = Joi.object({

    title: Joi.string().required()
        .min(2).max(100)
        .error(generateError(
            "Title is a required field and must be between 2 and 100 characters.", 400)),

    opening_line: Joi.string().required()
        .min(6).max(200)
        .error(generateError(
            "Opening line is a required field and must be between 6 and 200 characters.", 400)),

    text: Joi.string().required()
        .min(6).max(500)
        .error(generateError(
            "Text is a required field and must be between 6 and 500 characters.", 400)),

    topic: Joi.any().required()
        .valid(...topics)
        .error(generateError("Topic must be sports, politics or finances.", 400)),

});

const editPostSchema = Joi.object({

    title: Joi.string()
        .min(2).max(100)
        .error(generateError(
            "Title is a required field and must be between 2 and 100 characters.", 400)),

    opening_line: Joi.string()
        .min(6).max(200)
        .error(generateError(
            "Opening line is a required field and must be between 6 and 200 characters.", 400)),

    text: Joi.string()
        .min(6).max(500)
        .error(generateError(
            "Text is a required field and must be between 6 and 500 characters.", 400)),

    topic: Joi.any()
        .valid(...topics)
        .error(generateError("Topic must be sports, politics or finances.", 400)),
});

const topicSchema = Joi.any()
    .valid(...topics)
    .error(generateError("Topic must be sports, politics or finances.", 400));

const idPostSchema = Joi.number().integer()
    .greater(0)
    .error(generateError("Id must be a positive number.", 400));


export {createPostSchema, editPostSchema, idPostSchema, topicSchema}

