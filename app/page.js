import { Navbar } from "@/components/navbar";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  Image,
  Stack,
  Center,
  Container,
} from "@/components/chakra";
import IndexImg from "@/public/index.jpg";
import ntut_logo from "@/public/ntut_logo.png";

const Background = ({ children }) => {
  return (
    <Flex
      minH={"800px"}
      height={"100vh"}
      bgPosition={"center"}
      backgroundSize={"cover"}
      backgroundImage={`url(${IndexImg.src})`}
    >
      <Stack
        flex={1}
        direction={"column"}
        backgroundColor={"rgba(0,0,0,0.6)"}
        color={"whiteAlpha.900"}
      >
        {children}
      </Stack>
    </Flex>
  );
};

const Header = () => {
  return (
    <Box as="header" w={"100%"} zIndex={50}>
      <Navbar />
    </Box>
  );
};

const Main = () => {
  return (
    <Center flex={1} as="main">
      <Box>
        <Heading as={"h1"} textAlign={"center"}>
          Welcome to
          <Box as="span" color={"orange.500"}>
            NuOJ!
          </Box>
        </Heading>
        <Text textAlign={"center"} fontWeight={"bold"}>
          一款來自 國立臺北科技大學 的線上程式評測系統
        </Text>
        <Text textAlign={"center"} fontWeight={"bold"}>
          系統正在進行開發中，你可以追蹤
          <Link href="https://github.com/ntut-xuan/NuOJ" color={"orange.500"}>
            我們的開發進度
          </Link>
        </Text>
      </Box>
    </Center>
  );
};

const Footer = () => {
  return (
    <Container as={"footer"} width={"fit-content"} paddingY={3}>
      <Link
        href="https://ntut.edu.tw"
        backgroundColor={"white"}
        display={"block"}
        padding={3}
        rounded={"lg"}
      >
        <Image alt="NTUT" src={ntut_logo.src} height={12} />
      </Link>
      <Text color={"whiteAlpha.900"} textAlign={"center"} fontWeight={"bold"}>
        <Box as="span" color={"orange.500"}>
          2023
        </Box>
        , NuOJ Team.
      </Text>
    </Container>
  );
};

const Index = () => {
  return (
    <Background>
      <Header />
      <Main />
      <Footer />
    </Background>
  );
};

export default Index;
