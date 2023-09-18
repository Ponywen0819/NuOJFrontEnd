import logo_min from "@/public/logo_min.png";
import pony from "@/public/pony.jpg";
import roy from "@/public/roy.jpg";
import uriah from "@/public/uriah.jpg";
import {
  Stack,
  Container,
  Text,
  Heading,
  Link,
  Image,
  Flex,
  Box,
} from "@/components/chakra";

const Header = () => {
  return (
    <Box as="header">
      <Link href="/" marginX={"auto"} display={"block"} width={"fit-content"}>
        <Image src={logo_min.src} boxSize={36} />
      </Link>
      <Heading
        as="h1"
        fontWeight={"light"}
        textDecorationLine={"underline"}
        textAlign={"center"}
      >
        Nu Online Judge Staff
      </Heading>
    </Box>
  );
};

const Main = () => {
  return (
    <Flex justify={"space-between"} as={"main"}>
      <User
        name={"黃漢軒"}
        photo={uriah.src}
        duties={[
          "System Design",
          "Backend Design",
          "Database Design",
          "Research and Development",
        ]}
      />
      <User
        name={"吳秉承"}
        photo={roy.src}
        duties={[
          "Cyber Security",
          "Linux Engineer",
          "Research and Development",
        ]}
      />
      <User name={"溫紹傑"} photo={pony.src} duties={["Frontend Design"]} />
    </Flex>
  );
};

const User = ({ name, photo, duties = [] }) => {
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
      {duties.map((duty) => (
        <Text>{duty}</Text>
      ))}
    </Stack>
  );
};

const About = () => {
  return (
    <Box
      className={"bg-orange-200"}
      position={"fixed"}
      inset={0}
      overflow={"auto"}
      paddingX={3}
      paddingY={5}
    >
      <Container
        backgroundColor={"white"}
        minW={"container.lg"}
        rounded={"lg"}
        paddingX={3}
        paddingY={5}
        display={"flex"}
        flexDirection={"column"}
        gap={10}
      >
        <Header />
        <Main />
      </Container>
    </Box>
  );
};

export default About;
