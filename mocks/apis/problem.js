import { rest } from "msw";
import { HOST } from "@/setting";

const fake_problems = [];
let problemcount = 25;
let id = 1234;
while (problemcount--) {
  fake_problems.push({
    header: {
      problem_pid: id,
      title: `${parseInt(Math.random() * 100)}第${id}題拉`,
      time_limit: 5,
      memory_limit: 131072,
    },
    content: {
      description: `$\\frac{1}{2}$用來模擬的第${id}題拉`,
      input_description: `用來模擬的第${id}題拉 $\\frac{1}{2}$`,
      output_description: `用來模擬 $\\frac{1}{2}$ 的第${id}題拉`,
      note: `用來模擬的第${id}題拉`,
    },
    author: {
      user_uid: "8d828772-50a5-4496-8114-0bf64132c125",
      handle: "test_account",
    },
  });
  id++;
}

export const problem = [
  rest.get(`${HOST}/api/problem`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(fake_problems));
  }),

  rest.post(`${HOST}/api/problem`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(fake_problems));
  }),

  rest.get(`${HOST}/api/problem/:id`, (req, res, ctx) => {
    const id = parseInt(req.params.id);
    for (const problem of fake_problems) {
      if (problem.header.problem_pid === id) {
        return res(ctx.status(200), ctx.delay(1000), ctx.json(problem));
      }
    }

    return res(
      ctx.status(400),
      ctx.json({
        message: "Invalid problem ID.",
      })
    );
  }),

  rest.put(`${HOST}/api/problem/:id`, (req, res, ctx) => {
    const id = parseInt(req.params.id);
    for (const problem of fake_problems) {
      if (problem.header.problem_pid === id) {
        return res(ctx.status(200), ctx.delay(1000));
      }
    }

    return res(ctx.status(403));
  }),

  rest.delete(`${HOST}/api/problem/:id`, (req, res, ctx) => {
    const id = parseInt(req.params.id);
    for (const problem of fake_problems) {
      if (problem.header.problem_pid === id) {
        return res(ctx.status(200), ctx.delay(1000));
      }
    }

    return res(ctx.status(403));
  }),
];
