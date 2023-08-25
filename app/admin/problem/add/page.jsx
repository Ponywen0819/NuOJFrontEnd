"use client";

import {
  Box,
  Stack,
  Heading,
  Divider,
  Button,
  Flex,
  Textarea,
} from "@/components/chakra";
import { Subnav, Tab } from "@/components/subnav";
import { useForm, FormProvider } from "react-hook-form";
import { InputGroup } from "@/components/form";
import { HOST } from "@/setting";
import { error_swal, success_swal } from "@/components/notification";

const TextAreaInput = ({ id, lable, placeholder, required }) => {
  return (
    <InputGroup
      id={id}
      lable={lable}
      placeholder={placeholder}
      input={Textarea}
      resize={"none"}
      height={36}
      required={required}
    />
  );
};

const AddProblemPage = () => {
  const methods = useForm();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const handleAdd = async (data) => {
    const { title, time_limit, memory_limit, ...remain } = data;
    const res = await fetch(`${HOST}/api/problem`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        header: {
          title,
          time_limit,
          memory_limit,
        },
        content: remain,
      }),
    });

    if (!res.ok) {
      error_swal("上傳發生錯誤");
      return;
    }

    success_swal("新增成功");
  };

  return (
    <Box as="section" flex={1}>
      <Subnav>
        <Tab href={"/admin/problem/list"}>題目列表</Tab>
        <Tab href={"/admin/problem/add"} isActive={true}>
          新增題目
        </Tab>
      </Subnav>
      <FormProvider {...methods}>
        <Stack
          as="form"
          boxShadow={"sm"}
          paddingX={3}
          paddingY={5}
          backgroundColor={"white"}
          rounded={"lg"}
          gap={3}
          onSubmit={handleSubmit(handleAdd)}
        >
          <Heading as={"h1"}>新增題目</Heading>
          <Divider />
          <InputGroup
            id={"title"}
            lable={"標題"}
            placeholder={"請輸入題目"}
            required={"不可留空"}
          />
          <InputGroup
            id={"time_limit"}
            lable={"時間限制"}
            placeholder={"請輸入時間限制"}
            required={"不可留空"}
          />
          <InputGroup
            id={"memory_limit"}
            lable={"記憶體限制"}
            placeholder={"請輸入時間限制"}
            required={"不可留空"}
          />
          <TextAreaInput
            id={"description"}
            lable={"題目敘述"}
            placeholder={"請輸入題目敘述"}
            required={"不可留空"}
          />
          <TextAreaInput
            id={"input_description"}
            lable={"輸入敘述"}
            placeholder={"請輸入輸入敘述"}
            required={"不可留空"}
          />
          <TextAreaInput
            id={"output_description"}
            lable={"輸出敘述"}
            placeholder={"請輸入輸出敘述"}
            required={"不可留空"}
          />
          <TextAreaInput
            id={"note"}
            lable={"Note"}
            placeholder={"請輸入 Note"}
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
    </Box>
  );
};

export default AddProblemPage;
