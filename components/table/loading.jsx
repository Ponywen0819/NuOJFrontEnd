import { Spinner, Center } from "@/components/chakra";

export const TableLoading = () => {
  return (
    <Center height={64}>
      <Spinner size={"lg"} />
    </Center>
  );
};
