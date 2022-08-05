import { FC, ReactElement, ReactNode, useMemo } from "react";
import { Navbar as Sidebar, useMantineTheme } from "@mantine/core";
import { ChartInfographic, Dashboard, Forms, SquareRoot2 } from "tabler-icons-react";
import NavbarLink from "./NavbarLink"

export type NavbarRoute = {
  route:string;
  label:string;
  icon:ReactNode;
};

const routes: NavbarRoute[] = [
  {
    route: "/",
    label: "Beranda",
    icon: <Dashboard size={16} />
  },
  {
    route: "/kuesioner",
    label: "Data Kuesioner",
    icon: <Forms size={16} />
  },
  {
    route: "/perhitungan",
    label: "Perhitungan",
    icon: <SquareRoot2 size={16} />
  },
  {
    route: "/hasil",
    label: "Hasil",
    icon: <ChartInfographic size={16} />
  },
]

const Navbar: FC = (): ReactElement => {
  const {primaryColor} = useMantineTheme();
  const menu = useMemo(() => (
    routes.map(route => (
      <NavbarLink {...route} color={primaryColor} key={route.route} />
    ))
  ), [primaryColor]);

  return (
    <Sidebar height={"100%"} p="xs" width={{ base: 250 }}>
      <Sidebar.Section grow mt="md" >
        {menu}
      </Sidebar.Section>
    </Sidebar>
  );
};

export default Navbar;
