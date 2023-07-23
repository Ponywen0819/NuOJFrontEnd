import { rest } from "msw";
import { HOST } from "@/setting";

const fake_problems = [];
let problemcount = 25;
let id = 1234;
while (problemcount--) {
  fake_problems.push({
    id: id,
    data: {
      content: {
        title: `第${id}題拉`,
        description: `$\\frac{1}{2}$用來模擬的第${id}題拉`,
        input_description: `用來模擬的第${id}題拉 $\\frac{1}{2}$`,
        output_description: `用來模擬 $\\frac{1}{2}$ 的第${id}題拉`,
        note: `用來模擬的第${id}題拉`,
      },
      setting: {
        time_limit: `用來模擬的第${id}題拉`,
        memory_limit: `用來模擬的第${id}題拉`,
      },
      author: {
        user_uid: "some_uuid",
        handle: "pony",
      },
    },
  });
  id++;
}

export const problem = [
  rest.get(`${HOST}/api/problem`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1000), ctx.json(fake_problems));
  }),

  rest.get(`${HOST}/api/problem/:id`, (req, res, ctx) => {
    const id = parseInt(req.params.id);
    for (const problem of fake_problems) {
      console.log(problem);
      if (problem.id === id) {
        return res(ctx.status(200), ctx.json(problem));
      }
    }

    return res(ctx.status(403));
  }),
];
