"use client";

import { Table, Thead, Tr, Link } from "@/components/chakra";
import {
  TableProvider,
  TableHeader,
  TableBody,
  TableSelector,
} from "@/components/table";
import { HOST } from "@/setting";
import NextLink from "next/link";
import useSWR from "swr";

const fetcher = (...arg) =>
  fetch(...arg)
    .then((res) => {
      if (!res.ok) {
        const error = new Error("error on fetching submition list");
        error.message = "Can't get submition list";
        throw error;
      }

      return res.json();
    })
    .then((json) => {
      return json.map((submit) => ({
        id: submit.id,
        problem: submit.problem,
        handle: {
          children: submit.user.handle,
          href: `/profile/${submit.user.handle}`,
        },
        date: submit.date,
        verdict: submit.verdict.verdict,
        time: submit.verdict.time.toString(),
        memory: submit.verdict.memory.toString(),
      }));
    });

const TableLink = ({ children, href }) => {
  return (
    <Link as={NextLink} href={href} color={"orange.600"}>
      {children}
    </Link>
  );
};

const ProblemList = () => {
  const { data: submitions } = useSWR(`${HOST}/api/submission`, fetcher);
  console.log(submitions);
  return (
    <TableProvider
      rounded={"lg"}
      boxShadow={"sm"}
      backgroundColor={"white"}
      pageSize={10}
      isLoading={!submitions}
      enableSelector={true}
    >
      <Table>
        <Thead backgroundColor={"rgb(254 215 170)"}>
          <Tr>
            <TableHeader title={"題目 ID"} id={"id"} />
            <TableHeader title={"題目名稱"} id={"problem"} />
            <TableHeader
              title={"提交人"}
              id={"handle"}
              columnType={TableLink}
            />
            <TableHeader title={"提交時間"} id={"date"} />
            <TableHeader title={"提交狀態"} id={"verdict"} />
            <TableHeader title={"狀態"} id={"time"} />
            <TableHeader title={"時長"} id={"memory"} />
          </Tr>
        </Thead>
        <TableBody datas={submitions} />
      </Table>
    </TableProvider>
  );
};

export default ProblemList;
