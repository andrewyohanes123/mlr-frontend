import { FC, ReactElement } from "react";
import { Box, Text } from "@mantine/core";

const App: FC = (): ReactElement => {
  return (
    <Box
      p="md"
      sx={(theme) => ({ background: theme.colors.dark[3], height: "100%" })}
    >
      <Text color="yellow">MLR</Text>
    </Box>
  );
};

export default App;
