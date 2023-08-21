import express from "express";

export const createProblemRoute = (db) => {
  const problemRoute = express.Router();

  problemRoute
    .route("/")
    .get((req, res) => {
      const list = db.get("problem");
      res.jsonp(list);
    })
    .post((req, res) => {
      res.jsonp({
        message: "OK.",
      });
    });

  problemRoute
    .route("/:id")
    .all(express.json())
    .all((req, res, next) => {
      const id = req.params.id;
      const problem = db.get("problem").get(id);
      if (!problem.value()) {
        res.status(404);
        res.jsonp({
          message: "Invalid problem ID.",
        });
        return;
      }

      req.problem = problem;
      next();
    })
    .get((req, res) => {
      res.jsonp(req.problem.value());
    })
    .put((req, res) => {
      const { header, content } = req.body;
      const problem = req.problem;
      problem.set("header", header).commit();
      problem.set("content", content).commit();
      res.jsonp({
        message: "OK.",
      });
    })
    .delete((req, res) => {
      res.jsonp({
        message: "OK.",
      });
    });
  return problemRoute;
};
