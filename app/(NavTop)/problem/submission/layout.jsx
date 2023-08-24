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
      <Box width={{ base: "container.lg", lg: "100%" }}>
        <Table>
          <Header height="64px">
            <HeaderColumn width={"10%"}>題目 ID</HeaderColumn>
            <HeaderColumn width="20%">題目名稱</HeaderColumn>
            <HeaderColumn>提交人</HeaderColumn>
            <HeaderColumn>提交時間</HeaderColumn>
            <HeaderColumn>狀態</HeaderColumn>
            <HeaderColumn>記憶體</HeaderColumn>
            <HeaderColumn>時長</HeaderColumn>
          </Header>
          {children}
          <Selector />
        </Table>
      </Box>
    </RequireAuth>
  );
};

export default ProblemSubmitionLayout;
