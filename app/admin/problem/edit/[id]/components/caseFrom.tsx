import {
  Heading,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
  Center,
  Text,
  Button,
} from "@/components/chakra";
import useSWR from "swr";
import Editor from "@monaco-editor/react";

const fetcher = (url: string): Promise<Code> =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("rrr");
    }
    return res.json();
  });

type UploadProp = {
  id: number;
  type: "solution" | "checker" | "testcase";
  label: string;
};

type Code = {
  language: string;
  content: string;
};

const CodeNotFound = () => {
  return (
    <Center>
      <Text>並未上傳</Text>
    </Center>
  );
};

const CodeArea = ({ data }: { data: Code | null }) => {
  if (!data) return <Spinner />;

  if (data.content === "") return <CodeNotFound />;

  return (
    <Editor
      value={data.content}
      language={data.language}
      options={{
        tabCompletion: "off",
        contextmenu: false,
        quickSuggestions: {
          other: false,
          comments: false,
          strings: false,
        },
        parameterHints: {
          enabled: false,
        },
        suggestOnTriggerCharacters: false,
        acceptSuggestionOnEnter: "off",
        wordBasedSuggestions: false,
        minimap: {
          enabled: false,
        },
        scrollBeyondLastLine: false,
      }}
      loading={<Spinner />}
    />
  );
};

export const CodeForm = ({ id, type, label }: UploadProp) => {
  const { data } = useSWR(`/api/problem/${id}/${type}`, fetcher);
  return (
    <Accordion allowMultiple backgroundColor={"white"} rounded={"xl"}>
      <AccordionItem>
        <>
          <AccordionButton>
            <Heading as={"h1"}>{label}</Heading>
            <AccordionIcon />
          </AccordionButton>
        </>
        <AccordionPanel pb={4}>
          <Stack>
            <Button>上傳新檔案</Button>
            <CodeArea data={data} />
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};
