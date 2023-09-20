import { Box } from "@/components/chakra";

export const Background = ({ children }) => {
  return (
    <Box position={"fixed"} inset={0} bgColor={"#fed7aa"}>
      <Box w={"full"} h={"full"} padding={3} overflow={"auto"}>
        {children}
      </Box>
    </Box>
  );
};
