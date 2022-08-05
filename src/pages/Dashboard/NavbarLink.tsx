import { FC, ReactElement, useCallback } from "react";
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

  return (
    <UnstyledButton
      onClick={navigateToRoute}
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        background:
          pathname === route
            ? theme.colorScheme !== "dark"
              ? theme.colors.gray[2]
              : theme.colors.dark[6]
            : "transparent",
        color:
          theme.colorScheme === "dark"
            ? theme.colors.dark[0]
            : theme.colors.gray[9],
        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[1],
        },
      })}
    >
      <Group noWrap>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>

        <Text
          style={{
            fontWeight: "bold",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis"
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