import express from "express";
import { createAuthRoute } from "./auth.js";
import { createProblemRoute } from "./problem.js";
import { createProfileRoute } from "./profile.js";
import { createSubmissionRoute } from "./submission.js";
import { createSubmitRoute } from "./submit.js";
import { createDatabase } from "../db.js";
import jsonServer from "json-server";
import _ from "lodash";

export const createAPIRoute = () => {
  const db = createDatabase();

  const chain = _.chain(db).get("data");

  const mainRouter = express.Router();
  mainRouter.use(jsonServer.defaults());
  mainRouter.use("/auth", createAuthRoute(chain));
  mainRouter.use("/problem", createProblemRoute(chain));
  mainRouter.use("/profile", createProfileRoute(chain));
  mainRouter.use("/submission", createSubmissionRoute(chain));
  mainRouter.use("/submit", createSubmitRoute());
  return mainRouter;
};
