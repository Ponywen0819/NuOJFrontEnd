"use client";

import { Subnav, Tab } from "@/components/subnav";
import { useEffect, useRef, useState, forwardRef } from "react";
import { HOST } from "@/setting";
import { error_swal, success_swal } from "@/components/notification";
import { SlideFade } from "@chakra-ui/react";
import { Loading } from "@/components/loading";
import { useRouter } from "next/navigation";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Stack,
  Heading,
  Divider,
  Flex,
  Button,
  Box,
  Textarea,
} from "@/components/chakra";
import { useForm } from "react-hook-form";
import useSWR from "swr";

const InputLine = forwardRef(({ initialval = "", title, ...props }, ref) => {
  const val_ref = ref || useRef();
  useEffect(() => {
    val_ref.current.value = initialval;
  }, [initialval]);

  return (
    <div className="flex">
      <div className="w-40">
        <p>{title}</p>
      </div>
      <textarea
        className="grow p-2 h-fit min-h-[64px] border-2 rounded-lg"
        ref={val_ref}
      />
    </div>
  );
});

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm();
  const { data: detail, mutate } = useSWR(
    `${HOST}/api/problem/${id}`,
    fetcher,
    { suspense: true },
  );

  const handleUpdate = async (data) => {
    const modified = Object.entries(touchedFields).reduce((a, c) => {
      const [key, val] = c;
      if (val) {
        a[key] = data[key];
      }
      return a;
    }, {});

    const res = await fetch(`${HOST}/api/problem/${id}`, {
      method: "PUT",
      body: JSON.stringify(modified),
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
    <>
      <Subnav>
        <Tab href={"/admin/problem/list"}>題目列表</Tab>
        <Tab href={"/admin/problem/add"}>新增題目</Tab>
        <Tab href={"#"} isActive={true}>
          修改題目
        </Tab>
      </Subnav>
      <SlideFade in={true}>
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
          <FormControl isInvalid={errors.title}>
            <FormLabel>標題</FormLabel>
            <Input
              defaultValue={detail.title}
              placeholder="請輸入題目"
              {...register("title", {
                required: "不可留空",
              })}
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.time_limit}>
            <FormLabel>時間限制</FormLabel>
            <Input
              type="text"
              placeholder="請輸入時間限制"
              defaultValue={detail.time_limit}
              {...register("time_limit", {
                required: "不可留空",
                pattern: {
                  value: /^[1-9]+[0-9]*$/,
                  message: "請輸入正整數",
                },
              })}
            />
            <FormErrorMessage>
              {errors.time_limit && errors.time_limit.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.memory_limit}>
            <FormLabel>記憶體限制</FormLabel>
            <Input
              type="text"
              placeholder="請輸入記憶體限制"
              defaultValue={detail.memory_limit}
              {...register("memory_limit", {
                required: "不可留空",
                pattern: {
                  value: /^[1-9]+[0-9]*$/,
                  message: "請輸入正整數",
                },
              })}
            />
            <FormErrorMessage>
              {errors.memory_limit && errors.memory_limit.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>題目敘述</FormLabel>
            <Textarea
              placeholder="請輸入題目"
              defaultValue={detail.description}
              {...register("description", {
                required: "不可留空",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>輸入敘述</FormLabel>
            <Textarea
              placeholder="請輸入題目"
              defaultValue={detail.input_description}
              {...register("input_description", {
                required: "不可留空",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>輸出敘述</FormLabel>
            <Textarea
              placeholder="請輸入題目"
              defaultValue={detail.output_description}
              {...register("output_description", {
                required: "不可留空",
              })}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Note</FormLabel>
            <Textarea
              placeholder="請輸入題目"
              defaultValue={detail.note}
              {...register("note")}
            />
          </FormControl>
          <Flex width={"fit-content"} marginX={"auto"} gap={3}>
            <Button type="submit" colorScheme="orange" isLoading={isSubmitting}>
              新增
            </Button>
            <Button type="reset" colorScheme="gray" isLoading={isSubmitting}>
              清除
            </Button>
          </Flex>
        </Stack>
      </SlideFade>
    </>
  );
};

export default EditProblemPage;
