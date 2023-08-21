import express from "express";

export const createSubmissionRoute = (db) => {
  const submissionRoute = express.Router();
  submissionRoute.route("/").get((req, res) => {
    const submitionList = db.get("submission").value();
    res.jsonp(submitionList);
  });

  submissionRoute
    .route("/:id")
    .all(express.json())
    .all((req, res, next) => {
      const id = req.params.id;
      const submissionQuery = db.get("submission").get(id);
      const submission = submissionQuery.value();

      if (!submission) {
        res.status(403);
        res.jsonp({
          message: "Invalid submition ID.",
        });
      }

      req.query = submissionQuery;
      next();
    })
    .get((req, res) => {
      const submission = req.query.value();
      res.jsonp(submission);
    });

  return submissionRoute;
};
