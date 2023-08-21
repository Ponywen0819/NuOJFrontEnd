import express from "express";
import path from "path";
import { fileURLToPath } from "url";

export const createProfileRoute = (db) => {
  const profileRouter = express.Router();
  profileRouter.use("/:handle", (req, res, next) => {
    const handle = req.params.handle;
    const user = db.get("user").find({ handle });
    if (!user.value()) {
      res.status(404);
      res.jsonp({
        message: "Absent user.",
      });
      return;
    }

    req.user = user;
    next();
  });

  profileRouter
    .route("/:handle")
    .all(express.json())
    .get((req, res) => {
      res.jsonp(req.user.value());
    })
    .put((req, res) => {
      const user = req.user;
      const { school, bio } = req.body;
      if (!school && !bio) {
        res.status(400);
        res.jsonp({
          message: "The format of the payload is incorrect.",
        });
        return;
      }

      if (school) {
        user.set("school", school).commit();
      }

      if (school) {
        user.set("bio", bio).commit();
      }

      res.jsonp({
        message: "OK.",
      });
    });

  profileRouter
    .route("/:handle/avatar")
    .get((req, res) => {
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = path.dirname(__filename);
      res.sendFile("/coding_monkey.jpeg", {
        root: path.join(__dirname, "../img"),
      });
    })
    .put((req, res) => {
      res.jsonp({
        message: "OK.",
      });
    });
  return profileRouter;
};
