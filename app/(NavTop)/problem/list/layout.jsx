import { Subnav, Tab } from "@/components/subnav";

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
      {children}
    </>
  );
};

export default ProblemListLayout;
