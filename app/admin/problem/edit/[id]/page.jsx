"use client";

import { Subnav, Tab } from "@/components/subnav";
import { useEffect, useRef, useState, forwardRef } from "react";
import { HOST } from "@/setting";
import { error_swal, success_swal } from "@/components/notification";
import { SlideFade } from "@chakra-ui/react";
import {
  Center,
  Spinner,
  Stack,
  Heading,
  Divider,
  Flex,
  Button,
  Box,
  Textarea,
} from "@/components/chakra";
import { useForm, FormProvider } from "react-hook-form";
import { InputGroup } from "@/components/form";
import useSWR from "swr";

const TextAreaInput = ({ id, lable, placeholder, required, defaultValue }) => {
  return (
    <InputGroup
      id={id}
      lable={lable}
      placeholder={placeholder}
      input={Textarea}
      resize={"none"}
      height={36}
      defaultValue={defaultValue}
      required={required}
    />
  );
};

const Loading = () => {
  return (
    <Center flex={1} height={48}>
      <Spinner size={"xl"} />
    </Center>
  );
};

const Form = ({ id, mutate, detail }) => {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleUpdate = async (data) => {
    const { title, time_limit, memory_limit, ...remain } = data;
    const res = await fetch(`${HOST}/api/problem/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        header: {
          title,
          time_limit,
          memory_limit,
        },
        content: { ...remain },
      }),
      headers: { "content-type": "application/json" },
    });

    if (!res.ok) {
      error_swal("上傳出現錯誤");
      return;
    }

    success_swal("更改成功");
    mutate(data, { revalidate: false });
  };
  return (
    <SlideFade in={true}>
      <FormProvider {...methods}>
        <Stack
          as="form"
          boxShadow={"sm"}
          paddingX={3}
          paddingY={5}
          backgroundColor={"white"}
          rounded={"lg"}
          gap={3}
          onSubmit={handleSubmit(handleUpdate)}
        >
          <Heading as={"h1"}>修改題目資訊</Heading>
          <Heading as={"h2"} fontSize={"sm"}>{`題目 ID : ${id}`}</Heading>
          <Divider />
          <InputGroup
            id={"title"}
            lable={"標題"}
            placeholder={"請輸入題目"}
            defaultValue={detail.title}
            required={"不可留空"}
          />
          <InputGroup
            id={"time_limit"}
            lable={"時間限制"}
            defaultValue={detail.time_limit}
            placeholder={"請輸入時間限制"}
            required={"不可留空"}
          />
          <InputGroup
            id={"memory_limit"}
            lable={"記憶體限制"}
            defaultValue={detail.memory_limit}
            placeholder={"請輸入時間限制"}
            required={"不可留空"}
          />
          <TextAreaInput
            id={"description"}
            lable={"題目敘述"}
            placeholder={"請輸入題目敘述"}
            defaultValue={detail.description}
            required={"不可留空"}
          />
          <TextAreaInput
            id={"input_description"}
            lable={"輸入敘述"}
            placeholder={"請輸入輸入敘述"}
            defaultValue={detail.input_description}
            required={"不可留空"}
          />
          <TextAreaInput
            id={"output_description"}
            defaultValue={detail.output_description}
            lable={"輸出敘述"}
            placeholder={"請輸入輸出敘述"}
            required={"不可留空"}
          />
          <TextAreaInput
            id={"note"}
            lable={"Note"}
            placeholder={"請輸入 Note"}
            defaultValue={detail.note}
          />
          <Flex width={"fit-content"} marginX={"auto"} gap={3}>
            <Button type="submit" colorScheme="orange" isLoading={isSubmitting}>
              新增
            </Button>
            <Button type="reset" colorScheme="gray" isDisabled={isSubmitting}>
              清除
            </Button>
          </Flex>
        </Stack>
      </FormProvider>
    </SlideFade>
  );
};

const fetcher = (...arg) =>
  fetch(...arg)
    .then((res) => {
      if (!res.ok) {
        const error = new Error("error on fetching problem detail");
        error.message = "can't get problem detail";
        throw error;
      }

      return res.json();
    })
    .then((json) => {
      return {
        title: json.header.title,
        time_limit: json.header.time_limit.toString(),
        memory_limit: json.header.memory_limit.toString(),
        description: json.content.description,
        input_description: json.content.input_description,
        output_description: json.content.output_description,
        note: json.content.note,
      };
    });

const EditProblemPage = ({ params }) => {
  const { id } = params;

  const { data: detail, mutate } = useSWR(`${HOST}/api/problem/${id}`, fetcher);

  return (
    <Box flex={1}>
      <Subnav>
        <Tab href={"/admin/problem/list"}>題目列表</Tab>
        <Tab href={"/admin/problem/add"}>新增題目</Tab>
        <Tab href={"#"} isActive={true}>
          修改題目
        </Tab>
      </Subnav>
      {detail ? <Form id={id} detail={detail} mutate={mutate} /> : <Loading />}
    </Box>
  );
};

export default EditProblemPage;
