import {
  Flex,
  ArrowLeftIcon,
  ArrowRightIcon,
  Button,
  IconButton,
} from "@/components/chakra";
import { useContext } from "react";
import { table_context } from "./provider";

export const TableSelector = () => {
  const { max, pageIndex, setPage } = useContext(table_context);
  const array = new Array(max).fill(0);

  return (
    <Flex
      justify={"center"}
      align={"center"}
      width={"100%"}
      gap={3}
      paddingY={3}
    >
      <IconButton
        variant={"ghost"}
        colorScheme="blackAlpha"
        rounded={"full"}
        icon={<ArrowLeftIcon />}
        onClick={() => setPage(pageIndex - 1)}
      />
      {array.map((e, i) => (
        <Button
          key={`btn-${i}`}
          variant={pageIndex === i ? "outline" : "ghost"}
          colorScheme={"blackAlpha"}
          rounded={"full"}
          boxSize={10}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </Button>
      ))}
      <IconButton
        variant={"ghost"}
        colorScheme="blackAlpha"
        rounded={"full"}
        icon={<ArrowRightIcon />}
        onClick={() => setPage(pageIndex + 1)}
      />
    </Flex>
  );
};
