import { Flex } from "@/components/chakra";
import type { ReactNode } from "react";

export const List = ({ children }: { children: ReactNode }) => {
  return (
    <Flex as={"ul"} gap={10} alignItems={"center"}>
      {children}
    </Flex>
  );
};
