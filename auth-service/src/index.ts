import express from "express";
import cors from "cors";
import helmet from "helmet";
import expressPino from "express-pino-logger";
import bodyParser from "body-parser";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const logger = require("pino")();

import passport from "./services/passport";
import routes from "./routes";
import { app as appConfig } from "./config";
import { defaultErrorHandler } from "./error";

const app: express.Application = express();
app.locals.name = appConfig.name;
app.locals.version = appConfig.version;

const ep = expressPino({
    logger,
} as any);
app.use(ep);
app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routes);

app.use(defaultErrorHandler);

app.listen(appConfig.port, () => {
    logger.info(`Server started http://${appConfig.host}:${appConfig.port} 🚀🚀🚀`);
});
