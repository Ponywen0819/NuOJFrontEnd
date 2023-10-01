"use client";

import { Table, Thead, Tr, Link, Box } from "@/components/chakra";
import { TableProvider, TableHeader, TableBody } from "@/components/table";
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
        date: { children: submit.date },
        verdict: submit.verdict.verdict,
        time: `${Math.round(submit.verdict.time / 10) / 100} s`,
        memory: `${Math.round(submit.verdict.memory / 10) / 100} mb`,
      }));
    });

const TableLink = ({ children, href }) => {
  return (
    <Link as={NextLink} href={href} color={"orange.600"}>
      {children}
    </Link>
  );
};

const TableTime = ({ children }) => {
  const year = children.slice(0, 4);
  const month = children.slice(4, 6);
  const day = children.slice(6, 8);
  const hour = children.slice(9, 11);
  const minumn = children.slice(11, 13);
  const utc = parseInt(children.slice(15, 18));

  return (
    <p className="text-sm">
      {`${year}/${month}/${day}`}
      <br />
      {`${hour}:${minumn}`}
      <sub>{`utc${utc >= 0 ? "+" : ""}${utc}`}</sub>
    </p>
  );
};

const ProblemList = () => {
  // const { data: submitions } = useSWR(`/api/submission`, fetcher);
  // console.log(submitions);
  // return (
  //   <TableProvider
  //     rounded={"lg"}
  //     boxShadow={"sm"}
  //     backgroundColor={"white"}
  //     pageSize={10}
  //     isLoading={!submitions}
  //     enableSelector={true}
  //   >
  //     <Table>
  //       <Thead backgroundColor={"rgb(254 215 170)"}>
  //         <Tr>
  //           <TableHeader
  //             title={"題目 ID"}
  //             id={"id"}
  //             width={"360px"}
  //             textAlign="start"
  //           />
  //           <TableHeader title={"題目名稱"} id={"problem"} width={"160px"} />
  //           <TableHeader
  //             title={"提交人"}
  //             id={"handle"}
  //             columnType={TableLink}
  //           />
  //           <TableHeader
  //             title={"提交時間"}
  //             id={"date"}
  //             columnType={TableTime}
  //           />
  //           <TableHeader title={"提交狀態"} id={"verdict"} />
  //           <TableHeader title={"時長"} id={"time"} />
  //           <TableHeader
  //             title={"記憶體用量"}
  //             id={"memory"}
  //             textAlign={"right"}
  //           />
  //         </Tr>
  //       </Thead>
  //       <TableBody datas={submitions} />
  //     </Table>
  //   </TableProvider>
  return <Box>開發中!!</Box>;
};

export default ProblemList;
