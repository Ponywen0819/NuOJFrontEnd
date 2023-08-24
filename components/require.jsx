"use client";

import { redirect } from "next/navigation";
import { auth_context } from "@/contexts/auth";
import { useContext } from "react";

export const RequireAuth = ({ children, loadingElement = <p>rr</p> }) => {
  const { user } = useContext(auth_context);

  if (user) {
    if (user.isLogin) return children;
    redirect("/auth/login");
  } else {
    return loadingElement;
  }
};
