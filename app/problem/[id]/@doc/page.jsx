"use client";

import { MathComponent } from "mathjax-react";
import useSWR from "swr";
import { Box, Stack, Text, Heading } from "@/components/chakra";
import { HOST } from "@/setting";

const TexSupport = ({ text }) => {
  let res = [];
  let from = 0;
  text.slice(from).replaceAll(/(\$.*\$)/g, (match, _, offset, string) => {
    if (offset !== 0) {
      res.push(<span key={offset}>{string.slice(0, offset - 1)}</span>);
    }
    res.push(
      <MathComponent
        key={`math-${offset}`}
        display={false}
        tex={match.slice(1, -1)}
      />
    );
    from += match.length + offset;
  });

  if (from !== text.length) {
    res.push(<span key={text.length}>{text.slice(from)}</span>);
  }

  return <p className="py-1">{res}</p>;
};

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const DocArea = (props) => {
  const { id } = props.params;
  const { data } = useSWR(`${HOST}/api/problem/${id}`, fetcher, {
    suspense: true,
  });
  const { header, content, author } = data;

  return (
    <Box width={"100%"}>
      <Box marginX={"auto"} width={"fit-content"} marginBottom={3}>
        <Heading as={"h1"}>{header.title}</Heading>
        <Text align={"center"}>{`運行時間限制 : ${header.time_limit}`}</Text>
        <Text align={"center"}>{`記憶體限制 : ${header.memory_limit}`}</Text>
      </Box>
      <Stack gap={3}>
        <Box>
          <Heading as={"h2"} fontSize={"xl"}>
            題目說明
          </Heading>
          <TexSupport text={content.description} />
        </Box>
        <Box>
          <Heading as={"h2"} fontSize={"xl"}>
            輸入說明
          </Heading>
          <TexSupport text={content.input_description} />
        </Box>
        <Box>
          <Heading as={"h2"} fontSize={"xl"}>
            輸出說明
          </Heading>
          <TexSupport text={content.output_description} />
        </Box>
        <Box>
          <Heading as={"h2"} fontSize={"xl"}>
            Note
          </Heading>
          <TexSupport text={content.note} />
        </Box>
      </Stack>
    </Box>
  );
};

export default DocArea;
