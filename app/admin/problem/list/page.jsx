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
import { Subnav, Tab } from "@/components/subnav";
import { Flex, Box, Center, Image, Text, SlideFade } from "@/components/chakra";
import { error_swal, success_swal } from "@/components/notification";
import { IconButton } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { HOST } from "@/setting";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

import logo_min from "@/public/logo_min.png";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/loading";
import useSWR from "swr";

const DeleteButton = ({ id, OnDelete }) => {
  const deleteProblem = async () => {
    const res = await fetch(`${HOST}/api/problem/${id}`, { method: "DELETE" });

    if (!res.ok) {
      error_swal("出現預期外的錯誤");
    }
    success_swal("刪除成功");
    OnDelete();
  };

  const showDialog = () => {
    Swal.fire({
      title: "是否刪除",
      text: `即將刪除題目 ${id}`,
      showCancelButton: true,
      confirmButtonText: "確認",
      cancelButtonText: "取消",
      confirmButtonColor: "rgb(249 115 22)",
      cancelButtonColor: "rgb(156 163 175)",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "處理中",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        deleteProblem();
      }
    });
  };

  return (
    <IconButton
      color={"blackAlpha.900"}
      backgroundColor={"whiteAlpha.900"}
      icon={<DeleteIcon />}
      onClick={showDialog}
    />
  );
};

const fetcher = (...arg) =>
  fetch(...arg)
    .then((res) => {
      if (!res.ok) {
        const error = new Error("error on fetching problem list");
        error.message = "can't get problem list";
        throw error;
      }
      return res.json();
    })
    .then((json) => {
      return json.map((problem) => ({
        id: problem.header.problem_pid,
        title: problem.header.title,
      }));
    });

const List = () => {
  const { data: problems, mutate } = useSWR(`${HOST}/api/problem`, fetcher, {
    suspense: true,
  });
  const router = useRouter();

  return problems?.map((problem) => (
    <Row key={problem.id}>
      <Cell>{problem.id}</Cell>
      <Cell>{problem.title}</Cell>
      <Cell>
        <IconButton
          icon={<EditIcon />}
          color={"blackAlpha.900"}
          backgroundColor={"whiteAlpha.900"}
          onClick={() => {
            router.push(`/admin/problem/edit/${problem.id}`);
          }}
        />
        <DeleteButton
          id={problem.id}
          OnDelete={() => {
            mutate(
              problems.filter((element) => element.id !== problem.id),
              { revalidate: false },
            );
          }}
        />
      </Cell>
    </Row>
  ));
};

const ListPage = () => {
  return (
    <>
      <Subnav>
        <Tab href={"/admin/problem/list"} isActive={true}>
          題目列表
        </Tab>
        <Tab href={"/admin/problem/add"}>新增題目</Tab>
      </Subnav>
      <Flex gap={3}>
        <Box as="section" flex={1} overflowX={"auto"}>
          <SlideFade in={true}>
            <Box width={{ base: "container.lg", lg: "100%" }}>
              <Table height="fit-content">
                <Header>
                  <HeaderColumn width="10%">題目 ID</HeaderColumn>
                  <HeaderColumn>題目名稱</HeaderColumn>
                  <HeaderColumn width="20%">操作</HeaderColumn>
                </Header>
                <Body pageSize={10}>
                  <List />
                </Body>
                <Selector />
              </Table>
            </Box>
          </SlideFade>
        </Box>
        <Box
          as="aside"
          display={{ base: "none", lg: "block" }}
          w={"fit-content"}
          p={0}
        >
          <Center
            w={64}
            h={64}
            backgroundColor={"whiteAlpha.900"}
            borderRadius={"lg"}
            boxShadow={"sm"}
          >
            <Box>
              <Image
                alt="aside logo"
                width={"128px"}
                height={"128px"}
                src={logo_min.src}
              />
              <Text align={"center"}>NuOJ lab.</Text>
            </Box>
          </Center>
        </Box>
      </Flex>
    </>
  );
};

export default ListPage;
