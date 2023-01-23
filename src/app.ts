import express, { Request, Response } from "express";
import { register } from "prom-client";
import KeyCloakRouter from "./routes/router";

import { configs } from "./config/config";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req: Request, res: Response) => {
  try {
    res.set("Content-Type", register.contentType);
    res.send("hello world");
    res.end(await register.metrics());
  } catch (ex) {
    res.status(500).end(ex);
  }
});

app.listen(configs.port, function () {
  console.log("Server Running");
});

app.use(KeyCloakRouter);

export default app;
