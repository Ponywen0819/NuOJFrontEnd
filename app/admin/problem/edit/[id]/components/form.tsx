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
import useSWR, { useSWRConfig } from "swr";
import { InputGroup } from "@/components/form";
import { useForm, FormProvider } from "react-hook-form";
import { problemInfo } from "@/type";
import { error_swal, success_swal } from "@/components/notification";

const TextAreaInput = ({
  id,
  label,
  placeholder,
  required,
  defaultValue,
}: {
  id: string;
  label: string;
  placeholder: string;
  required?: string | boolean;
  defaultValue: string | number;
}) => {
  return (
    <InputGroup
      id={id}
      label={label}
      placeholder={placeholder}
      input={Textarea}
      resize={"none"}
      height={36}
      defaultValue={defaultValue}
      required={required}
    />
  );
};

type FromProps = {
  id: number;
  detail: problemInfo;
};

export const Form = ({ id, detail }: FromProps) => {
  const methods = useForm();
  const { mutate } = useSWRConfig();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const handleUpdate = async (data) => {
    const { title, time_limit, memory_limit, ...remain } = data;
    const res = await fetch(`/api/problem/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        head: {
          title,
          time_limit: parseInt(time_limit),
          memory_limit: parseInt(memory_limit),
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
        <Heading as={"h2"} fontSize={"sm"}>{`題目 ID : ${id}`}</Heading>
        <Divider />
        <InputGroup
          id={"title"}
          label={"標題"}
          placeholder={"請輸入題目"}
          defaultValue={detail.head.title}
          required={"不可留空"}
        />
        <InputGroup
          id={"time_limit"}
          label={"時間限制"}
          defaultValue={detail.head.time_limit}
          placeholder={"請輸入時間限制"}
          required={"不可留空"}
        />
        <InputGroup
          id={"memory_limit"}
          label={"記憶體限制"}
          defaultValue={detail.head.time_limit}
          placeholder={"請輸入時間限制"}
          required={"不可留空"}
        />
        <TextAreaInput
          id={"description"}
          label={"題目敘述"}
          placeholder={"請輸入題目敘述"}
          defaultValue={detail.content.description}
          required={"不可留空"}
        />
        <TextAreaInput
          id={"input_description"}
          label={"輸入敘述"}
          placeholder={"請輸入輸入敘述"}
          defaultValue={detail.content.input_description}
          required={"不可留空"}
        />
        <TextAreaInput
          id={"output_description"}
          defaultValue={detail.content.output_description}
          label={"輸出敘述"}
          placeholder={"請輸入輸出敘述"}
          required={"不可留空"}
        />
        <TextAreaInput
          id={"note"}
          label={"Note"}
          placeholder={"請輸入 Note"}
          defaultValue={detail.content.note}
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
  );
};
