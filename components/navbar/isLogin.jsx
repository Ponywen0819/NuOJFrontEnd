"use client";

import {
  Menu,
  MenuList,
  MenuItem,
  MenuDivider,
  Box,
  Spinner,
} from "@/components/chakra";
import { MenuLink } from "./link";
import { HamburgerButton } from "./button";
import { useContext } from "react";
import { auth_context } from "@/contexts/auth";
import { PageOptions } from "./options";
import useSWR from "swr";
import { HOST } from "@/setting";
import { success_swal, error_swal } from "@/components/notification";
import { useRouter } from "next/navigation";

const fetcher = (...arg) => fetch(...arg).then((v) => v.json());

export const IsLoginInterface = () => {
  const router = useRouter();
  const { user, signout } = useContext(auth_context);
  const { handle } = user;
  const { data: profile } = useSWR(`${HOST}/api/profile/${handle}`, fetcher);
  if (!profile) return <Spinner size={"lg"} color="gray.200" />;

  const handleSignout = async () => {
    const status = await signout();
    if (status !== 200) {
      error_swal("出現預期外的錯誤");
      return;
    }

    success_swal("已登出").then(() => {
      router.push("/");
    });
  };

  const isAdmin = profile.role === 1;
  return (
    <Menu>
      <HamburgerButton />
      <MenuList>
        <Box display={{ base: "block", lg: "none" }}>
          <PageOptions />
          <MenuDivider />
        </Box>
        <MenuItem as={MenuLink} href={`/profile/${handle}`}>
          個人頁面
        </MenuItem>
        {isAdmin && (
          <MenuItem as={MenuLink} href={`/admin/problem/list`}>
            管理員頁面
          </MenuItem>
        )}
        <MenuDivider />
        <MenuItem onClick={handleSignout}>登出</MenuItem>
      </MenuList>
    </Menu>
  );
};
