import express, { Express, Request, Response } from "express";
import logger from "morgan";
import { connect_db } from "./config/db-config";
import { env_conf } from "./config/env-config";
import { crypto_router } from "./routes/crypto-route";
import { ErrorHandler } from "./utils/error-handler";
const cors = require("cors");
var cookieParser = require("cookie-parser");
const app: Express = express();
const port = process.env.PORT;
app.use(express.json());
app.use(cors());
app.use(logger("dev"));

app.use(cookieParser());
app.use("/api/v1/crypto", crypto_router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(ErrorHandler);

const start = (): void => {
  try {
    connect_db();
    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at ${
          env_conf.node_env == "dev" ? `http://localhost:${port}` : port
        } `
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
start();
