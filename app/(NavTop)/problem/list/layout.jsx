import { Subnav, Tab } from "@/components/subnav";
import {
  Table,
  Header,
  HeaderColumn,
  Body,
  Selector,
} from "@/components/table";
import { Box } from "@/components/chakra";

export const metadata = {
  title: "題目列表",
};

const ProblemListLayout = ({ children }) => {
  return (
    <>
      <Subnav>
        <Tab href={"/problem/list"} isActive={true}>
          題目列表
        </Tab>
        <Tab href={"/problem/submission"}>提交狀態</Tab>
      </Subnav>
      <Box width={{ base: "container.lg", lg: "100%" }}>
        <Table>
          <Header height="64px">
            <HeaderColumn width={"10%"}>題目 ID</HeaderColumn>
            <HeaderColumn>題目名稱</HeaderColumn>
            <HeaderColumn>題目作者</HeaderColumn>
            <HeaderColumn>題目標籤</HeaderColumn>
          </Header>
          <Body pageSize={30}>{children}</Body>
          <Selector />
        </Table>
      </Box>
    </>
  );
};

export default ProblemListLayout;
