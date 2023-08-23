"use client";

import { NavigateProvider } from "@/contexts/navigate";
import { AuthProvider } from "@/contexts/auth";
import { ChakraProvider, CacheProvider } from "@/components/chakra";

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
