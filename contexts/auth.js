"use client";

import { createContext, useLayoutEffect, useState } from "react";
import Cookies from "js-cookie";
import { useContext } from "react";
import { useRouter, usePathname } from "next/navigation";
import { HOST } from "@/setting";
import { navigate_context } from "@/contexts/navigate";
import { Loading } from "@/components/loading";

export const auth_context = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useLayoutEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const verify_data = await getJwtDecode();
    if (!verify_data) return;
    const { handle, email } = verify_data;

    const profile = await getProfile(handle);
    if (!profile) return;

    setUser({
      isLogin: true,
      handle,
      email,
      ...profile,
    });
  };

  const getProfile = async (handle) => {
    const res = await fetch(`${HOST}/api/profile/${handle}`);

    if (!res.ok) {
      setUser({ islogin: false });
      return;
    }

    const json = await res.json();
    return json;
  };

  const getJwtDecode = async () => {
    const jwt = Cookies.get("jwt");
    if (!jwt) {
      setUser({ islogin: false });
      return;
    }

    const res = await fetch(`${HOST}/api/auth/verify_jwt`, {
      method: "POST",
    });

    if (!res.ok) {
      setUser({ islogin: false });
      return;
    }

    const { data } = await res.json();

    return data;
  };

  const signin = async ({ account, password }) => {
    const res = await fetch(`${HOST}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account: account,
        password: password,
      }),
    });

    if (res.ok) {
      getInfo();
    } else {
      setUser({ isLogin: false });
    }

    return res.status;
  };

  const signout = async () => {
    const res = await fetch(`${HOST}/api/auth/logout`, { method: "POST" });

    Cookies.remove("jwt");
    if (res.ok) {
      setUser(null);
    }
    return res.status;
  };

  let context = { user, signin, signout };
  return (
    <auth_context.Provider value={context}>{children}</auth_context.Provider>
  );
};

export const RequireAuth = ({
  children,
  loadingElement = <Loading></Loading>,
}) => {
  const { user } = useContext(auth_context);
  const navigate = useContext(navigate_context);
  const location = usePathname();
  const router = useRouter();

  if (user) {
    if (user.isLogin) return children;
    else return loadingElement;
  } else {
    navigate.record(location);
    router.replace("/auth/login");
  }
};
