"use client";

import NextLink from "next/link";
import { Box, Button } from "@/components/chakra";

export const Tab = ({ isActive, href, children, ...props }) => {
  return (
    <Box as="li" display={"inline"}>
      <Button
        as={NextLink}
        href={href}
        variant="ghost"
        borderRadius={0}
        borderBottomWidth={2}
        marginBottom={"-2px"}
        borderBottomColor={isActive ? "orange.300" : "gray.300"}
      >
        {children}
      </Button>
    </Box>
  );
};

export const Subnav = ({ children }) => {
  return (
    <Box as="nav" width={"full"} marginBottom={3}>
      <Box as="ul" borderBottomColor={"gray.300"} borderBottomWidth={2}>
        {children}
      </Box>
    </Box>
  );
};
