import {
  Spinner,
  Container,
  Stack,
  Button,
  Box,
  Text,
} from "@/components/chakra";
import { GithubOutlined } from "@ant-design/icons";
import { GoogleIcon } from "../components/google";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error("error on fetching oauth info!");
    }
    return res.json();
  });

const BtnText = ({ children }: { children: string }) => {
  return <Text paddingX={2}>{children}</Text>;
};

export const Oauth = () => {
  const { data: oauth } = useSWR(`/api/auth/oauth_info`, fetcher);

  if (!oauth) {
    return (
      <Container width={"fit-content"}>
        <Spinner />
      </Container>
    );
  }

  const { github_oauth_url, google_oauth_url } = oauth;
  return (
    <Stack gap={3}>
      {github_oauth_url ? (
        <Button colorScheme="blackAlpha" backgroundColor={"black"}>
          <Box fontSize={"24px"}>
            <GithubOutlined />
          </Box>
          <BtnText>使用 GitHub 登入</BtnText>
        </Button>
      ) : (
        ""
      )}
      {google_oauth_url ? (
        <Button variant="outline" colorScheme="gray">
          <GoogleIcon />
          <BtnText>使用 Google 登入</BtnText>
        </Button>
      ) : (
        ""
      )}
    </Stack>
  );
};
