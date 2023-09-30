"use client";

import { createContext, useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { navigate_context } from "@/contexts/navigate";
import { success_swal, error_swal } from "@/components/notification";

type user = {
  isLogin: boolean;
  handle?: string;
  email?: string;
};

type callback = (code: number) => void;

type auth_context = {
  user: user;
  login: (
    account: string,
    password: string,
    callback?: callback
  ) => Promise<void>;
  logout: (callback?: callback) => Promise<void>;
};

export const auth_context = createContext<auth_context | null>(null);

export const AuthProvider = ({ children }) => {
  const navigate = useContext(navigate_context);
  const router = useRouter();
  const [user, setUser] = useState<user | null>(null);

  useLayoutEffect(() => {
    checkCookieExist() && getJwtDecode();
  }, []);

  const checkCookieExist = () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      setUser({ isLogin: false });
    }
    return jwt;
  };

  const getJwtDecode = async () => {
    const res = await handleVerify();

    if (!res.ok) setUser({ isLogin: false });

    if (!res.ok) {
      error_swal("發生未知錯誤", "無法取得使用者資訊");
      return;
    }

    const data = await res.json();
    setUser({
      isLogin: true,
      ...data.data,
    });
  };

  const login = async (
    account: string,
    password: string,
    callback: callback = null
  ) => {
    const res = await handleLogin(account, password);

    if (!res.ok) {
      callback && callback(res.status);
      return;
    }

    await getJwtDecode().then(() => {
      callback && callback(res.status);
    });
  };

  const logout = async (callback: callback = null) => {
    const res = await fetch(`/api/auth/logout`, { method: "POST" });

    Cookies.remove("jwt");
    if (!res.ok) {
      callback && callback(res.status);
    }

    setUser({ isLogin: false });
    callback && callback(res.status);
  };

  const context = { user, login, logout };
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

const handleLogin = (account: string, password: string) => {
  return fetch(`/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      account,
      password,
    }),
  });
};

const handleVerify = () => {
  return fetch(`/api/auth/verify_jwt`, {
    method: "POST",
  });
};
