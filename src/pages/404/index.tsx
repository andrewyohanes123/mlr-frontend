import { FC, ReactElement } from "react";
import { Button, Center, Text, Title, useMantineTheme } from "@mantine/core";
import { Dashboard, Error404 } from "tabler-icons-react";

const NotFoundPage: FC = (): ReactElement => {
  const { colors } = useMantineTheme();
  return (
    <Center
      sx={(theme) => ({
        width: "100%",
        height: "100%",
        borderRadius: theme.radius.md,
        background: theme.colors.gray[0],
        flexDirection: "column",
      })}
    >
      <Error404 size={60} color={colors.dark[7]} strokeWidth={1} />
      <Title order={1}>Oooppsss....</Title>
      <Text>Halaman tidak ditemukan</Text>
      <Button leftIcon={<Dashboard />} variant="light">
        Kembali ke beranda
      </Button>
    </Center>
  );
};

export default NotFoundPage;
