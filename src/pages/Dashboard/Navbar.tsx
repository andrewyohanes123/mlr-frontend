import { FC, ReactElement, ReactNode, useMemo } from "react";
import { DefaultMantineColor, Navbar as Sidebar, useMantineTheme } from "@mantine/core";
import {
  ChartInfographic,
  Dashboard,
  Forms,
  SquareRoot2,
} from "tabler-icons-react";
import NavbarLink from "./NavbarLink";

export type NavbarRoute = {
  route: string;
  label: string;
  icon: ReactNode;
  color?: DefaultMantineColor;
}

const routes: NavbarRoute[] = [
  {
    route: "/",
    label: "Beranda",
    icon: <Dashboard size={16} />,
    color: "red"
  },
  {
    route: "/kuesioner",
    label: "Data Kuesioner",
    icon: <Forms size={16} />,
    color: 'orange'
  },
  {
    route: "/perhitungan",
    label: "Perhitungan",
    icon: <SquareRoot2 size={16} />,
  },
  {
    route: "/hasil",
    label: "Hasil",
    icon: <ChartInfographic size={16} />,
  },
];

const Navbar: FC = (): ReactElement => {
  const { primaryColor } = useMantineTheme();
  const menu = useMemo(
    () =>
      routes.map((route) => (
        <NavbarLink {...route} color={route?.color ?? primaryColor} key={route.route} />
      )),
    [primaryColor]
  );

  return (
    <Sidebar
      height={"100%"}
      pl="xs"
      pt="xs"
      sx={({ colors }) => ({ background: colors.blue[0], borderRightWidth: 0 })}
      width={{ base: 250 }}
    >
      <Sidebar.Section grow mt="md">
        {menu}
      </Sidebar.Section>
    </Sidebar>
  );
};

export default Navbar;
