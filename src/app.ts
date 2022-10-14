require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";

import router from "./routes/routes";
import { error404 } from "./controllers/errors/404";
import { errorHandler } from "./controllers/errors/errorHandler";

const app = express();

app.use(bodyParser.json());

app.use("/lendsqr", router);


app.use(error404);
app.use(errorHandler);

export default app;