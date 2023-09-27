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
import { Header } from "@/components/header";

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
        backgroundColor={"rgba(17,24,39,0.8)"}
        color={"whiteAlpha.900"}
      >
        {children}
      </Stack>
    </Flex>
  );
};

// const Header = () => {
//   return (
//     <Box as="header" w={"100%"} zIndex={50}>
//       <Navbar />
//     </Box>
//   );
// };

const Main = () => {
  return (
    <Center
      flex={1}
      as="main"
      className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
    >
      <Box>
        <Text fontSize="5xl" textAlign={"center"} fontWeight={"semibold"}>
          Welcome to NuOJ!
        </Text>
        <Text
          fontSize="2xl"
          textAlign={"center"}
          fontWeight={"medium"}
          m="4"
          mt="1"
        >
          一款來自 國立臺北科技大學 的線上程式評測系統
        </Text>
        <Text fontSize="2xl" textAlign={"center"} fontWeight={"medium"} m="4">
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
    <Container
      as={"footer"}
      className="absolute bottom-[9vh] left-[50%] -translate-x-[50%] w-full"
    >
      <Link
        href="https://ntut.edu.tw"
        backgroundColor={"white"}
        display={"block"}
        padding={3}
        width={"fit-content"}
        margin={"auto"}
        my="5"
        className="duration-500 hover:bg-slate-400"
      >
        <Image alt="NTUT" src={ntut_logo.src} />
      </Link>
      <Text color={"whiteAlpha.900"} textAlign={"center"}>
        2023, NuOJ Team.
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
