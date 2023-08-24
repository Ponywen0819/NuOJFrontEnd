import {
  Table,
  Header,
  HeaderColumn,
  Body,
  Selector,
} from "@/components/table";
import { Subnav, Tab } from "@/components/subnav";
import { Box } from "@/components/chakra";
import { RequireAuth } from "@/components/require";

export const metadata = {
  title: "繳交狀態",
};

const ProblemSubmitionLayout = ({ children }) => {
  return (
    <RequireAuth>
      <Subnav>
        <Tab href={"/problem/list"}>題目列表</Tab>
        <Tab href={"/problem/submission"} isActive={true}>
          提交狀態
        </Tab>
      </Subnav>
      <Box width={{ base: "container.lg", lg: "100%" }}>{children}</Box>
    </RequireAuth>
  );
};

export default ProblemSubmitionLayout;
