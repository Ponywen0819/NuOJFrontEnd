"use client";

import useSWR from "swr";
import {
  Stack,
  Flex,
  Text,
  Image,
  Link,
  Spinner,
  SlideFade,
} from "@/components/chakra";
import NextLink from "next/link";
import { auth_context } from "@/contexts/auth";
import { useContext } from "react";

const fetcher = (...arg) =>
  fetch(...arg).then((res) => {
    if (!res.ok) {
      const error = new Error("error on fetching user information");
      error.message = "User Not Found";
      throw error;
    }

    return res.json();
  });

const imgFetcher = (...arg) =>
  fetch(...arg)
    .then((res) => {
      if (!res.ok) {
        const error = new Error("error on fetching user information");
        error.message = "User Image Not Found";
        throw error;
      }
      return res.blob();
    })
    .then(
      (blob) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result;
            resolve(base64);
          };
          reader.readAsDataURL(blob);
        })
    );

export const ProfileAside = ({ handle }) => {
  const { data: profile } = useSWR(`/api/profile/${handle}`, fetcher);
  const { data: img } = useSWR(
    () => `/api/profile/${handle}/avatar`,
    imgFetcher
  );

  if (!profile || !img) return <Spinner />;

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
      <Image
        alt="user avater"
        boxSize={{ base: "3xs", lg: "xs" }}
        borderRadius={"full"}
        src={img}
      />
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
        {auth_handle === handle && (
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
        )}
      </Flex>
    </Stack>
  );
};
