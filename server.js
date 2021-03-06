import "dotenv/config";
import express from "express";
import { postRouter } from "./routes/routesPosts.js";
import { userRouter } from "./routes/routesUsers.js";
import { notFound } from "./middlewares/notFound.js";
import { handleError } from "./middlewares/handleError.js";
import { fileURLToPath } from "url";

import fileUpload from "express-fileupload";
import path from "path";
import cors from "cors";

const { SERVER_PORT } = process.env;
const app = express();

const __dirname = fileURLToPath(import.meta.url);

const dirProjectRoot = path.join(__dirname, "..");

app.use(
  cors({
    origin: ["http://localhost:3000", "www.mi-otro-front.com"],
  })
);
app.use(express.json());
app.use(fileUpload());
console.log(dirProjectRoot)

// app.use('/images', express.static(__dirname + '/Images'));
/*  app.use(
  "/images",
  express.static(path.join(dirProjectRoot,"images"))
);   */
app.use(
  "/images/upload-avatar-users",
  express.static(path.join(dirProjectRoot,"images/upload-avatar-users"))
);  
app.use(
  "/images/upload-photos-posts",
  express.static(path.join(dirProjectRoot,"images/upload-photos-posts"))
);  

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/user", userRouter);

app.use(notFound);
app.use(handleError);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on http://localhost:${SERVER_PORT}`);
});
