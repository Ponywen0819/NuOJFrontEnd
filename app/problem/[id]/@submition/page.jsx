"use client";

import {
  Table,
  Header,
  HeaderColumn,
  Body,
  Row,
  Cell,
  Selector,
} from "@/components/table";

import { Date, Time } from "@/components/table/types";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SlideFade } from "@chakra-ui/react";
import { HOST } from "@/setting";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SubmitionArea = ({ params }) => {
  const { id } = params;
  const { data } = useSWR(`${HOST}/api/submition/${id}`, fetcher, {
    suspense: true,
  });

  const link_class =
    "border-b-2 border-white border-opacity-0 duration-100 hover:border-black hover:border-opacity-100 py-1";
  return (
    <>
      <Table borderWidth="0px">
        <Header height="64px" backgroundColor="white">
          <HeaderColumn>提交 ID</HeaderColumn>
          <HeaderColumn>提交人</HeaderColumn>
          <HeaderColumn>提交時間</HeaderColumn>
          <HeaderColumn>狀態</HeaderColumn>
          <HeaderColumn>記憶體</HeaderColumn>
          <HeaderColumn>時長</HeaderColumn>
        </Header>
        <Body pageSize={30}>
          {data?.map((e) => (
            <Row key={e.id}>
              <Cell>{e.id}</Cell>
              <Cell
                as={<Link />}
                href={`/profile/${e.user.handle}`}
                className={link_class}
              >
                {e.user.handle}
              </Cell>
              <Cell as={<Date />}>{e.date}</Cell>
              <Cell>{e.verdict.verdict}</Cell>
              <Cell as={<Time />}>{e.verdict.time}</Cell>
              <Cell>{e.verdict.memory}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </>
  );
};

export default SubmitionArea;
