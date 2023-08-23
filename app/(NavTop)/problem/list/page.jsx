"use client";

import { Row, Cell, Body } from "@/components/table";
import { Spinner } from "@/components/chakra";
import NextLink from "next/link";
import { HOST } from "@/setting";
import useSWR from "swr";

const fetcher = (...arg) =>
  fetch(...arg)
    .then((res) => {
      if (!res.ok) {
        throw new Error("error on fetching problem list");
      }
      return res.json();
    })
    .then((json) => {
      return json.map((problem) => ({
        id: problem.header.problem_pid,
        title: {
          text: problem.header.title,
          href: `/problem/${problem.header.problem_pid}`,
        },
        author: {
          text: problem.author.handle,
          href: `/profile/${problem.author.handle}`,
        },
      }));
    });

const ProblemList = () => {
  const link_class =
    "border-b-2 border-white border-opacity-0 duration-100 hover:border-black hover:border-opacity-100 py-1";
  const { data: problems } = useSWR(`${HOST}/api/problem`, fetcher);
  if (!problems) return <Spinner />;
  return (
    <Body pageSize={30}>
      {problems.map((problem) => (
        <Row key={problem.id}>
          <Cell>{problem.id}</Cell>
          <Cell
            as={<NextLink />}
            href={problem.title.href}
            className={link_class}
          >
            {problem.title.text}
          </Cell>
          <Cell
            as={<NextLink />}
            href={problem.author.href}
            className={link_class}
          >
            {problem.author.text}
          </Cell>
        </Row>
      ))}
    </Body>
  );
};

export default ProblemList;
