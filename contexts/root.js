"use client";

import { NavigateProvider } from "@/contexts/navigate";
import { AuthProvider } from "@/contexts/auth";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export const Providers = ({ children }) => {
  return (
    <NavigateProvider>
      <AuthProvider>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </AuthProvider>
    </NavigateProvider>
  );
};
