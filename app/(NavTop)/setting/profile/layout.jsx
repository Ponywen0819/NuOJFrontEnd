"use client";

import {
  ScaleFade,
  Flex,
  Box,
  Image,
  Stack,
  Text,
  IconButton,
  EditIcon,
} from "@/components/chakra";
import { createContext, useContext, useState } from "react";
import { auth_context } from "@/contexts/auth";
import { RequireAuth } from "@/components/require";
import useSWR from "swr";
import { HOST } from "@/setting";

const fetcher = (...arg) => fetch(...arg).then((res) => res.json());

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
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            const base64 = reader.result;
            resolve(base64);
          };
          reader.readAsDataURL(blob);
        })
    );

export const img_context = createContext(null);

const SettingContext = (props) => {
  const [imgPop, setPop] = useState(false);
  const { user } = useContext(auth_context);
  const { handle } = user;
  const { data: profileInfo } = useSWR(
    `${HOST}/api/profile/${handle}`,
    fetcher
  );
  const { data: imgSrc } = useSWR(
    `${HOST}/api/profile/${handle}/avatar`,
    imgFetcher
  );
  const isAdmin = profileInfo.role;

  const { profile, image } = props;

  return (
    <>
      <ScaleFade in={true}>
        <Flex direction={{ base: "column", lg: "row" }} gap={3}>
          <Stack
            backgroundColor={"whiteAlpha.900"}
            borderRadius={"lg"}
            boxShadow={"sm"}
            paddingX={3}
            paddingY={5}
          >
            <Flex direction={{ base: "row", lg: "column" }} gap={3}>
              <Box position={"relative"} boxSize={{ base: "3xs", lg: "xs" }}>
                <Image
                  alt="user avater"
                  boxSize={{ base: "3xs", lg: "xs" }}
                  fit={"cover"}
                  borderRadius={"full"}
                  src={imgSrc}
                />
                <IconButton
                  icon={<EditIcon />}
                  position={"absolute"}
                  bottom={{ base: 3, lg: 6 }}
                  right={{ base: 3, lg: 6 }}
                  backgroundColor={"blackAlpha.900"}
                  color={"whiteAlpha.900"}
                  isRound={true}
                  onClick={() => setPop(true)}
                />
              </Box>
              <Flex flex={1} direction={"column"} justify={"space-between"}>
                <Text
                  w={"100%"}
                  fontSize={"xl"}
                  fontWeight={"bold"}
                  color={"gray.400"}
                  align={"left"}
                >
                  {isAdmin ? "管理員" : "使用者"}
                </Text>
                <Text
                  fontWeight={"bold"}
                  fontSize={"5xl"}
                  align={{ base: "center", lg: "left" }}
                >
                  {handle}
                </Text>
              </Flex>
            </Flex>
          </Stack>
          {profile}
        </Flex>
      </ScaleFade>
      <img_context.Provider value={{ imgPop, setPop }}>
        {imgPop && image}
      </img_context.Provider>
    </>
  );
};

const SettingLayout = (props) => {
  return (
    <RequireAuth>
      <SettingContext {...props} />
    </RequireAuth>
  );
};

export default SettingLayout;
