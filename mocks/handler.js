import { auth } from "./apis/auth";
import { profile } from "./apis/profile";

export const handlers = [...auth, ...profile];
