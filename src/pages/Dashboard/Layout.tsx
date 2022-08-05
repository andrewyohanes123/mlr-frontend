import { FC, ReactElement } from "react";
import { AppShell } from "@mantine/core";
import Routes from "./Routes";
import Navbar from "./Navbar";
import AppHeader from "./Header";

const Layout: FC = (): ReactElement => {
  return (
    <AppShell padding="xs" navbar={<Navbar />} header={<AppHeader />}>
      <Routes />
    </AppShell>
  );
};

export default Layout;
