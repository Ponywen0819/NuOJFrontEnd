import { auth } from "./apis/auth";
import { profile } from "./apis/profile";
import { problem } from "./apis/problem";
import { submition } from "./apis/submition";

export const handlers = [...auth, ...profile, ...problem, ...submition];
