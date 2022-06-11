import 'dotenv/config'
import express from 'express'
import {router} from "./routes/routes.js";
import {userRouter} from "./routes/routesUsers.js";
import {notFound} from "./middlewares/notFound.js";
import {handleError} from "./middlewares/handleError.js";

const { SERVER_PORT } = process.env;
const app = express();

app.use(express.json());
app.use('/api/v1', router)
app.use('/api/v1/user', userRouter)

app.use(notFound);
app.use(handleError);

app.listen(SERVER_PORT, () => {
    console.log(`Server listening on http://localhost:${SERVER_PORT}`);
});
