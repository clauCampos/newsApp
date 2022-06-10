import 'dotenv/config'
import express from 'express'
import {router} from "./routes/routes.js";
import {userRouter} from "./routes/routesUsers.js";

const { SERVER_PORT } = process.env;
const app = express();

app.use(express.json());
app.use('/api/v1', router)
app.use('/api/v1/user', userRouter)
/*const {
    registerUser,
    activateUser,
    loginUser,
} = require("./controllers/userController");*/

/*const { getAllPosts, getPostById,createPost, editPost } = require("./controllers/postController");*/

/*app.post("/users", registerUser);
app.put("/users/activate/:registrationCode", activateUser);
app.post("/login", loginUser);
app.post("/entries", validateAuth, createEntry);
app.patch("/entries/:idEntry", validateAuth, editEntry);

/** Middleware 404 */
app.use((request, response) => {
    response.status(404).send({
        status: "error",
        message: "Not found",
    });
});

/** Middleware error */
app.use((error, request, response, next) => {
    console.error(error);

    resp.status(error.httpStatus || 500).send({
        status: "error",
        message: error.message,
    });
});
/*const {
    validateAuth,
    notFound,
    handleError,
} = require("./middlewares");*/

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on http://localhost:${SERVER_PORT}`);
});
