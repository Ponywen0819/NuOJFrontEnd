import express from "express";

export const createSubmitRoute = () => {
  const submitRoute = express.Router();

  submitRoute.route("/").post((req, res) => {
    res.jsonp({
      message: "OK.",
      ...req.body,
    });
  });

  return submitRoute;
};
