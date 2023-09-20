import { Container, Link, Image, Heading } from "@/components/chakra";
import logo_min from "@/public/logo_min.png";
import NextLink from "next/link";

export const Logo = () => {
  return (
    <Container w={"fit-content"}>
      <Link
        href="/"
        marginX={"auto"}
        display={"block"}
        width={"fit-content"}
        marginBottom={3}
        as={NextLink}
      >
        <Image src={logo_min.src} boxSize={36} />
      </Link>
      <Heading as={"h1"} fontWeight={"normal"} fontSize={"5xl"}>
        {"Nu Online Judge Staff"}
      </Heading>
    </Container>
  );
};
