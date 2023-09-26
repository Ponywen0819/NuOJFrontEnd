import { AbsoluteCenter, Divider, Box } from "@/components/chakra";

export const AuthDivider = () => {
  return (
    <Box position={"relative"}>
      <Divider />
      <AbsoluteCenter>或</AbsoluteCenter>
    </Box>
  );
};
