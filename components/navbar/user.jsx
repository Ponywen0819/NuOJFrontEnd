"use client";

import { useContext } from "react";
import { auth_context } from "@/contexts/auth";
import { Flex } from "@chakra-ui/react";
import { IsLoginInterface } from "./isLogin";
import { NotLoginInterface } from "./notLogin";

export const User = () => {
  const { user } = useContext(auth_context);
  const isLogin = user && user.isLogin;
  const notLogin = user && !user.isLogin;
  return (
    <Flex width={"fit-content"} marginLeft={"auto"} gap={10} align={"center"}>
      {isLogin && <IsLoginInterface />}
      {notLogin && <NotLoginInterface />}
    </Flex>
  );
};
