import cookieParser from "cookie-parser";
import express from "express";
import.meta;

export const createAuthRoute = (db) => {
  const authRouter = express.Router();

  authRouter.use(cookieParser());
  authRouter.post("/verify_jwt", (req, res) => {
    const { jwt } = req.cookies;
    if (!jwt) {
      res.status(403);
      res.jsonp({
        message: "JWT is invalid.",
      });
      return;
    }

    const user = db
      .get("user")
      .find({
        handle: jwt,
      })
      .value();

    if (!user || !user.verified) {
      res.status(403);
      res.jsonp({
        message: "JWT is invalid.",
      });
      return;
    }

    const { handle, email } = user;

    res.status(200);
    res.jsonp({
      message: "OK",
      data: {
        handle,
        email,
      },
    });
  });

  authRouter.use(express.json());
  authRouter.post("/login", (req, res) => {
    const { account, password } = req.body;

    if (!account || !password) {
      res.sendStatus(400);
      res.json({
        message: "The format of the payload is incorrect.",
      });
      return;
    }

    const user = db
      .get("user")
      .find({
        email: account,
        password: password,
      })
      .value();

    if (!user) {
      res.status(403);
      res.jsonp({
        message: "Incorrect account or password.",
      });
      return;
    }

    if (!user.verified) {
      res.status(401);
      res.jsonp({
        message: "The mail verification enabled but mail is not verify.",
      });
      return;
    }

    res.status(200);
    res.cookie("jwt", user.handle, {
      sameSite: "none",
      secure: true,
      expires: new Date(Date.now() + 900000),
    });
    res.jsonp({
      message: "OK.",
      ...user,
    });
    return;
  });

  authRouter.post("/register", (req, res) => {
    const { email, handle, password } = req.body;
    if (!email || !handle || !password) {
      res.status(400);
      res.jsonp({
        message: "The format of the payload is incorrect.",
      });
      return;
    }

    if (handle === "error") {
      res.status(422);
      res.jsonp({
        message: "Handle is invalid.",
      });
      return;
    }

    const sameHandle = db
      .get("user")
      .find({
        handle: handle,
      })
      .size()
      .value();

    const sameEmail = db
      .get("user")
      .find({
        email: email,
      })
      .size()
      .value();

    if (sameHandle || sameEmail) {
      res.status(403);
      res.jsonp({
        message: "The email or the handle is repeated.",
      });
      return;
    }

    res.jsonp({
      message: "OK.",
    });
  });

  authRouter.post("/logout", (req, res) => {
    res.clearCookie("jwt");
    res.jsonp({
      message: "OK.",
    });
  });

  authRouter.get("/oauth_info", (req, res) => {
    const oauth_info = db.get("oauth").value();
    res.jsonp(oauth_info);
  });

  return authRouter;
};
