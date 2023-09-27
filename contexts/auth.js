"use client";

import { createContext, useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { navigate_context } from "@/contexts/navigate";
import { success_swal } from "@/components/notification";

export const auth_context = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useContext(navigate_context);
  const router = useRouter();
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    checkCookieExsit() && getJwtDecode();
  }, []);

  const checkCookieExsit = () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      setUser({ isLogin: false });
    }
    return jwt;
  };

  const getJwtDecode = async (tragetError = false) => {
    const res = await fetch(`/api/auth/verify_jwt`, {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) setUser({ islogin: false });

    if (tragetError && !res.ok) {
      const error = new Error("error on fetching jwt decode");
      return error;
    }

    const data = await res.json();
    setUser({
      isLogin: true,
      ...data.data,
    });
  };

  const signin = async ({ account, password, errors = {} }) => {
    const res = await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        account,
        password,
      }),
    });

    if (!res.ok) {
      errors[res.status] && errors[res.status]();
      return;
    }

    getJwtDecode();
    success_swal("登入成功").then(() => {
      const url = navigate.get() || "/";
      router.push(url);
    });
  };

  const signout = async () => {
    const res = await fetch(`/api/auth/logout`, { method: "POST" });

    Cookies.remove("jwt");
    if (res.ok) {
      setUser({ isLogin: false });
    }
    return res.status;
  };

  let context = { user, signin, signout };
  return (
    <auth_context.Provider value={context}>{children}</auth_context.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(auth_context);
  if (!context) {
    throw new Error("not in auth provider");
  }
  return context;
};
