"use client";

import { List } from "./list";
import { NavLink } from "./link";
import { Box } from "@chakra-ui/react";

export const Nav = () => {
  return (
    <Box display={{ base: "none", lg: "block" }}>
      <List>
        <NavLink href="/problem/list" label="題目" />
        <NavLink href="/about" label="關於" />
      </List>
    </Box>
  );
};
