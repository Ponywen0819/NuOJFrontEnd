import { Stack, Image, Heading, Text } from "@/components/chakra";

export const Card = ({ name, photo, duties }) => {
  return (
    <Stack marginX={"auto"}>
      <Image
        src={photo}
        boxSize={"64"}
        objectFit={"cover"}
        rounded={"lg"}
        marginX={"auto"}
      />
      <Heading as={"h1"} fontSize={"3xl"}>
        {name}
      </Heading>
      <Heading as={"h2"} fontSize={"md"}>
        國立臺北科技大學 109 級資訊工程系
      </Heading>
      {duties?.map((duty) => (
        <Text key={`${name}-${duty}`}>{duty}</Text>
      ))}
    </Stack>
  );
};
