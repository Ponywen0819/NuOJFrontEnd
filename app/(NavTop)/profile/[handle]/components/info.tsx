"use client";

import {
  Heading,
  Divider,
  Box,
  Text,
  Stack,
  Spinner,
} from "@/components/chakra";
import useSWR from "swr";
import type { profile } from "./type";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      const error = new Error("error on fetching user information");
      error.message = "User Not Found";
      throw error;
    }

    return res.json();
  });

const Item = ({ title, content }) => {
  return (
    <Box>
      <Heading as={"h2"} fontSize={"xl"} color={"gray.400"}>
        {title}
      </Heading>
      <Text fontSize={"2xl"} fontWeight={"extrabold"} mt={2}>
        {content ? content : "尚未設定"}
      </Text>
    </Box>
  );
};

export const ProfileInfo = ({ handle }) => {
  const { data: profile } = useSWR<profile>(`/api/profile/${handle}`, fetcher);

  if (!profile) return <Spinner />;

  const { email, school, bio } = profile;
  return (
    <Stack
      backgroundColor={"whiteAlpha.900"}
      borderRadius={"lg"}
      boxShadow={"sm"}
      paddingX={3}
      paddingY={5}
      gap={3}
    >
      <Heading as={"h1"}>個人資訊</Heading>
      <Divider marginY={3} />
      <Item title={"學校"} content={school} />
      <Item title={"電子郵件"} content={email} />
      <Item title={"自我介紹"} content={bio} />
    </Stack>
  );
};
