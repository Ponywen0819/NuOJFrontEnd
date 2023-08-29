"use client";

import { RequireAuth } from "@/contexts/auth";
import { Navbar } from "@/components/navbar";
import {
  Stack,
  Box,
  Flex,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from "@/components/chakra";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const ProblemDetailLayout = (props) => {
  const { doc, submit, submition, params } = props;
  const { id } = params;

  useSWR(`/api/problem/${id}`, fetcher, { suspense: true });

  return (
    <Flex
      as={"main"}
      flex={1}
      gap={0}
      paddingX={3}
      paddingY={5}
      backgroundColor={"gray.100"}
    >
      <Flex w={"50%"} paddingX={5} paddingY={3}>
        <Flex
          flex={1}
          boxShadow={"sm"}
          rounded={"lg"}
          backgroundColor={"white"}
          overflow={"hidden"}
        >
          <Tabs
            flex={1}
            display={"flex"}
            flexDirection={"column"}
            overflow={"auto"}
            isLazy
          >
            <TabList>
              <Tab>題目說明</Tab>
              <Tab>提交狀態</Tab>
            </TabList>
            <TabPanels flex={1} display={"flex"}>
              <TabPanel flex={1} display={"flex"}>
                {doc}
              </TabPanel>
              <TabPanel flex={1} display={"flex"} overflow={"hidden"}>
                {submition}
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
      <Flex w={"50%"} paddingX={5} paddingY={3}>
        <Box flex={1} boxShadow={"sm"} rounded={"lg"} backgroundColor={"white"}>
          {submit}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProblemDetailLayout;
