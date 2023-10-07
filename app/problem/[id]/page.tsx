"use client";

import { Center, Flex, Spinner } from "@/components/chakra";
import dynamic from "next/dynamic";
const Main = dynamic(() => import("./components/main"));
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("error on fetching problem detail");
    }
    return res.json();
  });

const Loading = () => {
  return (
    <Center height={"100%"} width={"100%"}>
      <Spinner size={"lg"} />
    </Center>
  );
};

const ProblemDetail = ({ params }) => {
  const { id } = params;
  const { data: document } = useSWR(`/api/problem/${id}`, fetcher);

  return (
    <Flex as={"main"} flex={1} gap={3} padding={3}>
      {document ? <Main data={document} id={id} /> : <Loading />}
    </Flex>
  );
};

export default ProblemDetail;
