import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Center,
  Spinner,
} from "@/components/chakra";
import dynamic from "next/dynamic";
import ProblemDocument from "./document";
const ProblemSubmission = dynamic(() => import("./problemSubmission"));

const Loading = () => {
  return (
    <Center height={"100%"} width={"100%"}>
      <Spinner size={"xl"} />
    </Center>
  );
};

const Content = ({ id, data }) => {
  return (
    <>
      <TabList>
        <Tab>題目說明</Tab>
        {/* <Tab>提交狀態</Tab> */}
      </TabList>
      <TabPanels flex={1}>
        <TabPanel>
          <ProblemDocument data={data} />
        </TabPanel>
        {/* <TabPanel height={"100%"}>
          <ProblemSubmission id={id} />
        </TabPanel> */}
      </TabPanels>
    </>
  );
};

export const InfoArea = ({ id, data }) => {
  return (
    <Tabs
      isLazy
      width={"50%"}
      borderRadius={"lg"}
      backgroundColor={"white"}
      boxShadow={"sm"}
      display={"flex"}
      flexDirection={"column"}
    >
      {data ? <Content data={data} id={id} /> : <Loading />}
    </Tabs>
  );
};

export default InfoArea;
