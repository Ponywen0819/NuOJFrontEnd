import { Box, Stack } from "@/components/chakra";
import { Header } from "@/components/header";

const ProblemLayout = (props) => {
  const { children } = props;
  return (
    <Stack
      minH={"lg"}
      height={"100%"}
      minHeight={"100vh"}
      gap={0}
      background={"gray.100"}
    >
      <Header full bgColor="normal" />
      {children}
    </Stack>
  );
};

export default ProblemLayout;
