"use client";

import { createContext, useState, useEffect } from "react";
import { HOST } from "@/setting";

export const oauth_context = createContext();

export const OauthProvider = ({ children }) => {
  const [state, setState] = useState({});

  useEffect(() => {
    getOauthSetting();
  }, []);

  const getOauthSetting = async () => {
    let res = await fetch(`${HOST}/api/auth/oauth_info`, {
      method: "GET",
    });

    if (res.ok) {
      let json = await res.json();
      setState(json);
    }
  };

  return (
    <oauth_context.Provider value={state}>{children}</oauth_context.Provider>
  );
};
