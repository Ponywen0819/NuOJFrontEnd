import { rest } from "msw";
import { HOST } from "@/setting";

const fake_submit = [
  {
    id: 1222,
    date: "20230705T235853+0800",
    user: {
      user_uid: 1,
      handle: "pony",
      email: "test@email",
    },
    problem: "Hello World",
    compiler: "C++14",
    verdict: {
      verdict: "Wrong Answer",
      time: 1500,
      memory: 131072,
    },
  },
];

export const submition = [
  rest.get(`${HOST}/api/submition`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(fake_submit));
  }),
];
