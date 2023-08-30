"use client";

import { Box, Stack, Text, Heading } from "@/components/chakra";
import { TexSupport } from "@/components/texSupprot";

const TextGroup = ({ title, text }) => {
  return (
    <Box>
      <Text fontSize={"xl"}>{title}</Text>
      <TexSupport>{text}</TexSupport>
    </Box>
  );
};

const DocArea = ({ data }) => {
  const { header, content, author } = data;

  return (
    <Box width={"100%"}>
      <Box marginX={"auto"} width={"fit-content"} marginBottom={3}>
        <Heading as={"h1"}>{header.title}</Heading>
        <Text align={"center"}>{`運行時間限制 : ${header.time_limit}`}</Text>
        <Text align={"center"}>{`記憶體限制 : ${header.memory_limit}`}</Text>
      </Box>
      <Stack gap={3}>
        <TextGroup title={"題目說明"} text={content.description} />
        <TextGroup title={"輸入說明"} text={content.input_description} />
        <TextGroup title={"輸出說明"} text={content.output_description} />
        <TextGroup title={"Note"} text={content.note} />
      </Stack>
    </Box>
  );
};

export default DocArea;
