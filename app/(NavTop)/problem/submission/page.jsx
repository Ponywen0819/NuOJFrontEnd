"use client";

import { Row, Cell } from "@/components/table";
import { Date, Time } from "@/components/table/types";
import { Spinner } from "@/components/chakra";
import { HOST } from "@/setting";
import Link from "next/link";
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
          text: submit.user.handle,
          href: `/profile/${submit.user.handle}`,
        },
        date: submit.date,
        verdict: submit.verdict.verdict,
        time: submit.verdict.time,
        memory: submit.verdict.memory,
      }));
    });

const List = () => {
  const link_class =
    "border-b-2 border-white border-opacity-0 duration-100 hover:border-black hover:border-opacity-100 py-1";
  const { data: submitions } = useSWR(`${HOST}/api/submition`, fetcher);
  if (!submitions) return <Spinner />;
  return submitions.map((submition) => (
    <Row>
      <Cell>{submition.id}</Cell>
      <Cell>{submition.problem}</Cell>
      <Cell as={<Link />} href={submition.handle.href} className={link_class}>
        {submition.handle.text}
      </Cell>
      <Cell as={<Date />}>{submition.date}</Cell>
      <Cell>{submition.verdict}</Cell>
      <Cell as={<Time />}>{submition.time}</Cell>
      <Cell>{submition.memory}</Cell>
    </Row>
  ));
};

const ProblemList = () => {
  return <List />;
};

export default ProblemList;
