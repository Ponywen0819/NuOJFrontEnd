import { Spinner, Center } from "@/components/chakra";

export const TableLoading = () => {
  return (
    <Center height={64} flex={1}>
      <Spinner size={"lg"} />
    </Center>
  );
};
