import { FC, ReactElement, useCallback, useMemo } from "react";
import { ThemeIcon, UnstyledButton, Group, Text } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  route: string;
}

const NavbarLink: FC<MainLinkProps> = ({
  icon,
  color,
  label,
  route,
}): ReactElement => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navigateToRoute = useCallback(() => {
    navigate(route, {
      replace: true,
    });
  }, [navigate, route]);

  const isSelected = useMemo(() => pathname === route, [pathname, route]);

  return (
    <UnstyledButton
      onClick={navigateToRoute}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        paddingLeft: theme.spacing.lg,
        borderTopLeftRadius: theme.radius.lg,
        borderBottomLeftRadius: theme.radius.lg,
        background:
          pathname === route
            ? theme.colorScheme !== "dark"
              ? theme.colors.blue[1]
              : theme.colors.dark[6]
            : "transparent",
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : isSelected
            ? theme.colors.dark[4]
            : theme.colors.blue[9],
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.blue[2],
        },
      })}
    >
      <Group noWrap>
        <ThemeIcon color={color}>
          {icon}
        </ThemeIcon>

        <Text
        color=""
          style={{
            fontWeight: "bold",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
          }}
          size="sm"
        >
          {label}
        </Text>
      </Group>
    </UnstyledButton>
  );
};

export default NavbarLink;
