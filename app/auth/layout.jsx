"use client";

import { Box, Stack, AbsoluteCenter } from "@/components/chakra";
import { color_context, ColorProvider } from "@/contexts/color";
import { useContext } from "react";

const Content = ({ children }) => {
  const color = useContext(color_context);
  return (
    <Box
      backgroundColor={`${color}.300`}
      position={"fixed"}
      inset={0}
      paddingX={3}
      paddingY={5}
      overflow={"auto"}
    >
      <AbsoluteCenter>
        <Stack
          as={"main"}
          position={"relative"}
          width={"sm"}
          boxShadow={"sm"}
          boxSizing="border-box"
          marginX={"auto"}
          borderRadius={"lg"}
          backgroundColor={"white"}
          paddingX={3}
          paddingY={5}
          gap={5}
        >
          {children}
        </Stack>
      </AbsoluteCenter>
    </Box>
  );
};

const AuthLayout = ({ children }) => {
  return (
    <ColorProvider>
      <Content>{children}</Content>
    </ColorProvider>
  );
};

export default AuthLayout;
