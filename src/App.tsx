import { FC, ReactElement } from "react";
import Dashboard from "pages/Dashboard";
import Adapter from "forked.sirius.adapter";
import { useConnectServer } from "hooks/useConnectServer";
import { useViewportSize } from "@mantine/hooks";
import { Button, Center, Loader, Title, useMantineTheme } from "@mantine/core";
import { Refresh } from "tabler-icons-react";
import API from "connection/API";

const {
  REACT_APP_IP_ADDRESS = "http://localhost",
  REACT_APP_PORT = "1234",
}: NodeJS.ProcessEnv = process.env;

const adapter = new Adapter(
  REACT_APP_IP_ADDRESS,
  parseInt(REACT_APP_PORT),
  localStorage
);

export const AxiosAdapter = new API(
  REACT_APP_IP_ADDRESS,
  parseInt(REACT_APP_PORT)
);

const App: FC = (): ReactElement => {
  const { ready, error, tryAgain } = useConnectServer(adapter);
  const { width, height } = useViewportSize();
  const { spacing, primaryColor } = useMantineTheme();

  return ready ? (
    <Dashboard />
  ) : error ? (
    <Center sx={{ width, height, flexDirection: "column" }}>
      <Title ml={spacing.md} order={3}>
        Tidak dapat menghubungi server
      </Title>
      <Button my="md" onClick={tryAgain} leftIcon={<Refresh />}>
        Coba Lagi
      </Button>
    </Center>
  ) : (
    <Center sx={{ width, height }}>
      <Loader size="xl" color={primaryColor} />
      <Title ml={spacing.md} order={3}>
        Loading
      </Title>
    </Center>
  );
};

export default App;
