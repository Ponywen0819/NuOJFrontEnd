"use client";

import { error_swal, success_swal } from "@/components/notification";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Heading,
  Flex,
  Divider,
} from "@/components/chakra";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { HOST } from "@/setting";
import { useContext } from "react";
import { auth_context } from "@/contexts/auth";
import useSWR from "swr";

const fetcher = (...arg) => fetch(...arg).then((v) => v.json());

export const ProfileForm = () => {
  const { user } = useContext(auth_context);
  const { handle } = user;
  const { data: profile, mutate } = useSWR(
    `${HOST}/api/profile/${handle}`,
    fetcher,
    { suspense: true },
  );
  const router = useRouter();

  const { register, handleSubmit } = useForm();

  const handleProfileUpdate = async (data) => {
    let res = await fetch(`${HOST}/api/profile/${handle}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      error_swal("上傳發生問題");
      return;
    }

    success_swal("更新成功");
    mutate({ ...profile, ...data });
  };

  return (
    <Flex
      as="form"
      onSubmit={handleSubmit(handleProfileUpdate)}
      flex={1}
      height={"fit-content"}
      gap={3}
      direction={"column"}
      boxShadow={"sm"}
      backgroundColor={"whiteAlpha.900"}
      borderRadius={"lg"}
      borderWidth={"1px"}
      paddingX={3}
      paddingY={5}
    >
      <Box>
        <Heading as="h1">修改個人資訊</Heading>
        <Divider marginY={3} />
      </Box>
      <Box flex={1}>
        <FormControl>
          <FormLabel>學校</FormLabel>
          <Input
            type="text"
            defaultValue={profile.school}
            id="school"
            {...register("school")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>自我介紹</FormLabel>
          <Input
            type="text"
            id="bio"
            defaultValue={profile.bio}
            {...register("bio")}
          />
        </FormControl>
      </Box>
      <Flex width={"fit"} gap={3} margin={"auto"}>
        <Button
          type="submit"
          display={"block"}
          backgroundColor={"orange.400"}
          color={"whiteAlpha.800"}
          borderRadius={"lg"}
        >
          確認更改
        </Button>
        <Button
          onClick={() => router.push(`/profile/${handle}`)}
          height={10}
          paddingX={4}
          backgroundColor={"gray.400"}
          color={"whiteAlpha.800"}
          borderRadius={"lg"}
        >
          取消
        </Button>
      </Flex>
    </Flex>
  );
};

export default ProfileForm;
