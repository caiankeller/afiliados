import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (request: Request, response: Response) => {
  response.send("hello world")
});

app.listen(import.meta.env.PORT);
export const viteNodeApp = app;
