import { Low, Memory } from "lowdb";
import { v4 } from "uuid";

const user = [
  {
    role: 0,
    id: 1,
    verified: 1,
    password: "test",
    handle: "pony0819",
    email: "test1@test",
    school: "ntut",
    bio: "user profile test",
  },
  {
    role: 0,
    id: 2,
    verified: 0,
    password: "test",
    handle: "roy0528",
    email: "test2@test",
    school: "ntut",
    bio: "user profile test",
  },
  {
    role: 1,
    id: 3,
    verified: 1,
    password: "test",
    handle: "qqqq",
    email: "test3@test",
    school: "ntut",
    bio: "user profile test",
  },
];

const problem = [...Array(30)].map((_, index) => {
  return {
    header: {
      problem_pid: v4(),
      title: `Example Problem-${index}`,
      time_limit: 5,
      memory_limit: 131072,
    },
    content: {
      description:
        "Nulla quis ad fugiat ullamco sit eu culpa laboris nisi nostrud cupidatat mollit.",
      input_description:
        "Aliquip est commodo dolore laborum tempor minim enim culpa commodo qui consectetur.",
      output_description:
        "Sit excepteur et irure laboris cillum anim aliqua laborum.",
      note: "Laboris deserunt commodo dolore eu officia amet veniam tempor est duis do adipisicing.",
    },
    author: {
      user_uid: "8d828772-50a5-4496-8114-0bf64132c125",
      handle: "test_account",
    },
  };
});

const submission = [...Array(30)].map((_, index) => {
  return {
    id: index,
    date: "20230705T235853+0800",
    user: {
      user_uid: "8d828772-50a5-4496-8114-0bf64132c125",
      handle: "ntut-xuan",
      email: "ntut-xuan",
    },
    problem: "Hello World",
    compiler: "C++14",
    verdict: {
      verdict: "Wrong Answer",
      time: Math.round(Math.random() * 1500),
      memory: Math.round(Math.random() * 131072),
    },
  };
});

const oauth = {
  github_oauth_url: "github_oauth_url",
  google_oauth_url: "google_oauth_url",
};

export const createDatabase = () => {
  return new Low(new Memory(), {
    user,
    problem,
    submission,
    oauth,
  });
};
