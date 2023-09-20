import pony from "@/public/pony.jpg";
import roy from "@/public/roy.jpg";
import uriah from "@/public/uriah.jpg";
import { Flex } from "@/components/chakra";
import { Background } from "./component/background";
import { AboutContainer } from "./component/container";
import { Header } from "./component/header";
import { Logo } from "./component/logo";
import { Card } from "./component/card";

const UriahCard = () => {
  return (
    <Card
      name={"黃漢軒"}
      photo={uriah.src}
      duties={[
        "System Design",
        "Backend Design",
        "Database Design",
        "Research and Development",
      ]}
    />
  );
};

const RoyCard = () => {
  return (
    <Card
      name={"吳秉承"}
      photo={roy.src}
      duties={["Cyber Security", "Linux Engineer", "Research and Development"]}
    />
  );
};

const PonyCard = () => {
  return <Card name={"溫紹傑"} photo={pony.src} duties={["Frontend Design"]} />;
};

const About = () => {
  return (
    <Background>
      <AboutContainer>
        <Header>
          <Logo />
        </Header>
        <Flex>
          <UriahCard />
          <RoyCard />
          <PonyCard />
        </Flex>
      </AboutContainer>
    </Background>
  );
};

export default About;
