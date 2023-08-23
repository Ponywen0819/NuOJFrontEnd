import { Spinner, Container, Stack, Button } from "@/components/chakra";
import { HOST } from "@/setting";
import useSWR from "swr";

const fetcher = (...arg) =>
  fetch(...arg).then((res) => {
    if (!res.ok) {
      const error = new Error("error on fetching oauth info!");
      error.message = "can't gat oauth info";
    }
    return res.json();
  });

export const Oauth = () => {
  const { data: oauth } = useSWR(`${HOST}/api/auth/oauth_info`, fetcher);

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
      {github_oauth_url ? <Button>使用 github 登入</Button> : ""}
      {google_oauth_url ? <Button>使用 google 登入</Button> : ""}
    </Stack>
  );
};
