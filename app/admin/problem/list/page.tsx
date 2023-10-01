"use client";

import { Table, Thead, Tr } from "@/components/chakra";
import { TableProvider, TableHeader, TableBody } from "@/components/table";
import { Subnav, Tab } from "@/components/subnav";
import { Box, SlideFade } from "@/components/chakra";
import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";

import useSWR from "swr";
import NextLink from "next/link";
import { DeleteButton } from "@/components/problemDleteBtn";
import { problemInfo } from "@/type";

const fetcher = (url: string): Promise<problemInfo[]> =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("error on fetching problem list");
    }
    return res.json();
  });

const formatter = (data: problemInfo[]) =>
  data.map((problemInfo) => ({
    id: {
      children: problemInfo.head.problem_pid,
    },
    title: problemInfo.head.title,
    opt: { children: problemInfo.head.problem_pid },
  }));

const ProblemOperator = ({ children, OnDelete }) => {
  return (
    <Box>
      <IconButton
        icon={<EditIcon />}
        aria-label="operator btn"
        as={NextLink}
        href={`/admin/problem/edit/${children}`}
        color={"blackAlpha.900"}
        backgroundColor={"whiteAlpha.900"}
      />
      <DeleteButton id={children} OnDelete={() => OnDelete(children)} />
    </Box>
  );
};

const ProblemTable = () => {
  const { data: problems, mutate } = useSWR(`/api/problem`, fetcher);

  const infos = problems && formatter(problems);

  return (
    <SlideFade in={true}>
      <TableProvider
        isLoading={!infos}
        rounded={"lg"}
        boxShadow={"sm"}
        backgroundColor={"white"}
        pageSize={10}
        enableSelector={true}
      >
        <Table>
          <Thead backgroundColor={"rgb(254 215 170)"}>
            <Tr>
              <TableHeader
                title={"題目 ID"}
                id={"id"}
                width={"360px"}
                textAlign="start"
              />
              <TableHeader title={"題目名稱"} id={"title"} width={"160px"} />
              <TableHeader
                title={"操作"}
                id={"opt"}
                textAlign="end"
                columnType={({ children }) => {
                  return (
                    <ProblemOperator
                      OnDelete={(id) => {
                        // mutate(problems.filter((problem) => problem.id !== id));
                      }}
                    >
                      {children}
                    </ProblemOperator>
                  );
                }}
              />
            </Tr>
          </Thead>
          <TableBody datas={infos} />
        </Table>
      </TableProvider>
    </SlideFade>
  );
};

const ListPage = () => {
  return (
    <Box as="section" flex={1}>
      <Subnav>
        <Tab href={"/admin/problem/list"} isActive={true}>
          題目列表
        </Tab>
        <Tab href={"/admin/problem/add"}>新增題目</Tab>
      </Subnav>
      <Box as="main" flex={1} overflow={"hidden"}>
        <ProblemTable />
      </Box>
    </Box>
  );
};

export default ListPage;
