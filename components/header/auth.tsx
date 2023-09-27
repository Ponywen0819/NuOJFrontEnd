"use client";

import {
  Flex,
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Spinner,
  forwardRef,
  MenuItemProps,
  MenuButton,
  IconButton,
  HamburgerIcon,
} from "@/components/chakra";
import NextLink from "next/link";
import { useAuth } from "@/contexts/auth";
import { NavLink } from "./link";
import { List } from "./list";

type LinkProps = {
  href: string;
  children: string;
};

export const HamburgerBtn = () => (
  <MenuButton
    as={IconButton}
    icon={<HamburgerIcon />}
    rounded={"lg"}
    variant="outline"
    aria-label="Options"
    colorScheme="whiteAlpha"
  />
);

const ItemProps: MenuItemProps = {
  color: "black",
};

const NavItem = ({ href, children }: LinkProps) => (
  <MenuItem as={NextLink} color={"black"} href={href} {...ItemProps}>
    {children}
  </MenuItem>
);

const PageLink = ({ href, children }: LinkProps) => (
  <MenuItem
    as={NextLink}
    display={{
      base: "block",
      lg: "none",
    }}
    href={href}
    {...ItemProps}
  >
    {children}
  </MenuItem>
);

const UserMenu = () => {
  const { user } = useAuth();
  const isAdmin = user.role === 1;

  return (
    <Menu>
      <HamburgerBtn />
      <MenuList>
        <PageLink href="/profile">個人頁面</PageLink>
        {isAdmin ? (
          <PageLink href="/admin/problem/list">管理員介面</PageLink>
        ) : (
          ""
        )}
        <NavItem href="/profile">個人頁面</NavItem>
        <NavItem href="/admin/problem/list">管理員介面</NavItem>
        <MenuDivider />
        <MenuItem>登出</MenuItem>
      </MenuList>
    </Menu>
  );
};

export const Auth = () => {
  const { user } = useAuth();
  const isLoading = !user;
  const isLogin = !isLoading && user.isLogin;

  if (isLoading) {
    return (
      <List>
        <Spinner size={"lg"} />
      </List>
    );
  }

  if (!isLogin) {
    return (
      <List>
        <NavLink href="/auth/login" label="登入" />
        <NavLink href="/auth/register" label="註冊" />
      </List>
    );
  }

  return (
    <List>
      <UserMenu />
    </List>
  );
};
