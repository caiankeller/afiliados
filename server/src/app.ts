import express, { Express } from "express";
import cors from "cors";
import router from "./routes/router";

const app: Express = express();

app.use(cors());
app.use(router);

app.listen(1707); // you gotta change that on the vite config, the plugin is in the very early development, so its kinda rustic yet
export const viteNodeApp = app;
