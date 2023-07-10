import { auth } from "./apis/auth";
import { profile } from "./apis/profile";
import { problem } from "./apis/problem";

export const handlers = [...auth, ...profile, ...problem];
