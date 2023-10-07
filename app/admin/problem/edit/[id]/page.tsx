"use client";

import { Subnav, Tab } from "@/components/subnav";
import {
  Heading,
  Box,
  Stack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Spinner,
} from "@/components/chakra";
import useSWR from "swr";
import { problemInfo } from "@/type";
import { Form } from "./components/form";
import { Update } from "./components/update";

const fetcher = (url: string): Promise<problemInfo> =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("error on fetching problem detail");
    }

    return res.json();
  });
const FormAccordion = ({ id, detail }) => {
  return (
    <Accordion allowMultiple backgroundColor={"white"} rounded={"xl"}>
      <AccordionItem>
        <>
          <AccordionButton>
            <Heading as={"h1"}>修改題目資訊</Heading>
            <AccordionIcon />
          </AccordionButton>
        </>
        <AccordionPanel pb={4}>
          <Form id={id} detail={detail} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

const EditProblemPage = ({ params }) => {
  const id = parseInt(params.id);

  const { data: detail } = useSWR(`/api/problem/${id}`, fetcher);

  return (
    <Box flex={1}>
      <Subnav>
        <Tab href={"/admin/problem/list"}>題目列表</Tab>
        <Tab href={"/admin/problem/add"}>新增題目</Tab>
        <Tab href={"#"} isActive={true}>
          修改題目
        </Tab>
      </Subnav>
      <Stack>
        {detail ? <FormAccordion id={id} detail={detail} /> : <Spinner />}
        <Update id={id} type="solution" label="解答程式" />
        <Update id={id} type="checker" label="比對程式" />
        {/* <Update id={id} type="testcase" label="測資" /> */}
      </Stack>
    </Box>
  );
};

export default EditProblemPage;
