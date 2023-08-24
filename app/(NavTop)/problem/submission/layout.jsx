import { Subnav, Tab } from "@/components/subnav";
import { RequireAuth } from "@/components/require";

export const metadata = {
  title: "繳交狀態",
};

const ProblemSubmitionLayout = ({ children }) => {
  return (
    // <RequireAuth>
    <>
      <Subnav>
        <Tab href={"/problem/list"}>題目列表</Tab>
        <Tab href={"/problem/submission"} isActive={true}>
          提交狀態
        </Tab>
      </Subnav>
      {children}
    </>
    // </RequireAuth>
  );
};

export default ProblemSubmitionLayout;
