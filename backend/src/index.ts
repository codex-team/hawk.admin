import express from "express";
import "./env";

import rabbit from "./routes/rabbit";

const app = express();

app.use("/rabbit", rabbit);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (res.headersSent) {
      return next(err);
    }
    res.status(500);
    res.send("SOrry");
  },
);

app.listen(3030, () => {
  console.log("Server started at :3030");
});
