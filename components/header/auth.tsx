"use client";

import {
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  Spinner,
  MenuItemProps,
  MenuButton,
  IconButton,
  HamburgerIcon,
} from "@/components/chakra";
import NextLink from "next/link";
import { useAuth } from "@/contexts/auth";
import { NavLink } from "./link";
import { List } from "./list";
import useSWR from "swr";
import { success_swal } from "../notification";

type LinkProps = {
  href: string;
  children: string;
};

type Profile = {
  user_uid: string;
  email: string;
  school: string;
  bio: string;
  handle: string;
  role: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

const PageLinkDivider = () => {
  return (
    <MenuDivider
      display={{
        base: "block",
        lg: "none",
      }}
    />
  );
};

const UserMenu = () => {
  const { user, logout } = useAuth();
  const { data: profile } = useSWR<Profile | undefined>(
    () => (user ? `/api/profile/${user.handle}` : null),
    fetcher
  );
  const isAdmin = user?.isLogin && profile?.role === 1;

  return (
    <Menu>
      <HamburgerBtn />
      <MenuList>
        <PageLink href="/problem">題目</PageLink>
        <PageLink href="/about">關於</PageLink>
        <PageLinkDivider />
        <NavItem href={`/profile/${user.handle}`}>個人頁面</NavItem>
        {isAdmin ? (
          <NavItem href="/admin/problem/list">管理員介面</NavItem>
        ) : (
          ""
        )}
        <MenuDivider />
        <MenuItem color={"black"} onClick={() => logout(logoutResultHandler)}>
          登出
        </MenuItem>
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

const logoutResultHandler = (code: number) => {
  switch (code) {
    case 200:
      success_swal("已登出");
      break;
  }
};
