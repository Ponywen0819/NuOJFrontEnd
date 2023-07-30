import { rest } from "msw";
import monkey from "../img/coding_monkey.jpeg";
import { HOST } from "@/setting";

const user_pony = {
  role: 0,
  userid: 1,
  handle: "pony",
  img: {
    buff: "",
    mime: "",
  },
  email: "pomy076152340@gmail.com",
  school: "台北科大",
  bio: "真假拉！原神-啟動!小跑豬來了！",
};

const initimg = async () => {
  const imageBuffer = await fetch(monkey.src).then((res) => res.arrayBuffer());
  user_pony.img.buff = imageBuffer;
  user_pony.img.mime = "image/jpeg";
};

initimg();

export const profile = [
  rest.get(`${HOST}/api/profile/:handle`, (req, res, ctx) => {
    if (req.params.handle === user_pony.handle) {
      return res(
        ctx.status(200),
        ctx.delay(1000),
        ctx.json({
          role: user_pony.role,
          email: user_pony.email,
          school: user_pony.school,
          bio: user_pony.bio,
        })
      );
    } else {
      return res(ctx.status(403));
    }
  }),

  rest.get(`${HOST}/api/profile/:handle/avatar`, async (req, res, ctx) => {
    let handle = req.params.handle;
    if (handle === user_pony.handle) {
      return res(
        ctx.set("Content-Length", user_pony.img.buff.byteLength),
        ctx.set("Content-Type", user_pony.img.mime),
        ctx.body(user_pony.img.buff)
      );
    } else {
      return res(ctx.status(403));
    }
  }),

  rest.post(`${HOST}/api/profile/:handle`, async (req, res, ctx) => {
    let json = await req.json();
    if ("bio" in json) {
      user_pony.bio = json["bio"];
    }
    if ("school" in json) {
      user_pony.school = json["school"];
    }
    return res(ctx.status(200), ctx.json({ status: "ok" }));
  }),

  rest.put(`${HOST}/api/profile/:handle/avatar`, async (req, res, ctx) => {
    const handle = req.params.handle;
    if (handle === user_pony.handle) {
      return res(ctx.status(200));
      // return req.passthrough();
    } else {
      return res(ctx.status(403));
    }
  }),
];
