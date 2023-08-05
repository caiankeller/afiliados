import express, { Express } from "express";
import cors from "cors";
import router from "./routes/router";

const app: Express = express();

app.use(cors());
app.use(router);

app.listen(1707); //pretty much useless, change that on vite.config
export const viteNodeApp = app;
