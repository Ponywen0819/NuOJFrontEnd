"use client";

import { Table, Thead, Tr, Link } from "@/components/chakra";
import { TableProvider, TableHeader, TableBody } from "@/components/table";
import NextLink from "next/link";
import useSWR from "swr";
import { problemInfo } from "@/type";

const fetcher = (url: string): Promise<problemInfo[]> =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("error on fetching problem list");
    }
    return res.json();
  });

const formatter = (data: problemInfo[]) =>
  data.map((problem) => ({
    id: {
      children: problem.head.problem_pid,
    },
    title: {
      children: problem.head.title,
      href: `/problem/${problem.head.problem_pid}`,
    },
    author: {
      children: problem.author.handle,
      href: `/profile/${problem.author.handle}`,
    },
    label: "",
  }));

const TableLink = ({ children, href }) => {
  return (
    <Link as={NextLink} href={href} color={"orange.600"}>
      {children}
    </Link>
  );
};

const ProblemTable = () => {
  const { data: problems } = useSWR(`/api/problem`, fetcher);

  const info = problems && formatter(problems);

  return (
    <TableProvider
      rounded={"lg"}
      boxShadow={"sm"}
      backgroundColor={"white"}
      pageSize={10}
      isLoading={!info}
      enableSelector={true}
    >
      <Table>
        <Thead paddingY={5}>
          <Tr backgroundColor={"rgb(254 215 170)"}>
            <TableHeader
              title={"題目 ID"}
              width={"360px"}
              id={"id"}
              textAlign="start"
            />
            <TableHeader
              title={"題目名稱"}
              id={"title"}
              width={"160px"}
              textAlign={"center"}
              columnType={TableLink}
            />
            <TableHeader
              title={"題目作者"}
              id={"author"}
              textAlign={"center"}
              columnType={TableLink}
            />
            <TableHeader title={"題目標籤"} id={"label"} textAlign={"right"} />
          </Tr>
        </Thead>
        {problems?.length ? <TableBody datas={info} /> : <></>}
      </Table>
    </TableProvider>
  );
};
export default ProblemTable;
