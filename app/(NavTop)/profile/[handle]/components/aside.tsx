"use client";

import useSWR from "swr";
import {
  Stack,
  Flex,
  Text,
  Image,
  Link,
  Spinner,
  Box,
} from "@/components/chakra";
import NextLink from "next/link";
import { auth_context } from "@/contexts/auth";
import { useContext } from "react";
import type { profile } from "./type";
import LogoMin from "@/public/logo_min.png";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("error on fetching user information");
    }

    return res.json();
  });

const imgFetcher = (url: string) =>
  fetch(url)
    .then((res) => {
      if (!res.ok) {
        throw new Error("error on fetching user information");
      }
      return res.blob();
    })
    .then((blob) => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          resolve(base64);
        };
        reader.readAsDataURL(blob);
      });
    });

const ProfileImg = ({ handle }: { handle: string }) => {
  const { data: img } = useSWR<string | undefined>(
    `/api/profile/${handle}/avatar`,
    imgFetcher
  );

  if (!img) return <Spinner />;

  console.log(img.split(","));
  return (
    <Image
      alt="user_avatar"
      boxSize={{ base: "3xs", lg: "xs" }}
      borderRadius={"full"}
      src={img.split(",")[1] === "" ? LogoMin.src : img}
    />
  );
};

const EditBtn = () => {
  return (
    <Link
      as={NextLink}
      href="/setting/profile"
      display={"block"}
      width={"100%"}
      borderWidth={"1px"}
      borderRadius={"lg"}
      borderColor={"gray.300"}
      color={"gray.300"}
      textAlign={"center"}
      fontSize={"xl"}
    >
      修改個人資料
    </Link>
  );
};

export const ProfileAside = ({ handle }: { handle: string }) => {
  const { data: profile } = useSWR<profile | undefined>(
    `/api/profile/${handle}`,
    fetcher
  );

  if (!profile) return <Spinner />;

  const auth_handle = useContext(auth_context).user?.handle;
  const { role } = profile;

  return (
    <Stack
      backgroundColor={"whiteAlpha.900"}
      borderRadius={"lg"}
      boxShadow={"sm"}
      paddingX={3}
      paddingY={5}
      direction={{ base: "row", lg: "column" }}
      gap={3}
    >
      <ProfileImg handle={handle} />
      <Flex flex={1} direction={"column"} justify={"space-between"}>
        <Text
          w={"100%"}
          fontSize={"xl"}
          fontWeight={"bold"}
          color={"gray.400"}
          align={"left"}
        >
          {role ? "管理員" : "使用者"}
        </Text>
        <Text
          fontWeight={"bold"}
          fontSize={"5xl"}
          align={{ base: "center", lg: "left" }}
        >
          {handle}
        </Text>
        {auth_handle === handle && <EditBtn />}
      </Flex>
    </Stack>
  );
};
