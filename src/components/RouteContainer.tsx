import { FC, ReactElement, ReactNode } from "react";
import { Box, Group, ThemeIcon, Title } from "@mantine/core";

interface IRouteContainerProps {
  icon?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
}

const RouteContainer: FC<IRouteContainerProps> = ({
  icon,
  title,
  children,
}): ReactElement => {
  return (
    <Box p="md">
      <Group my="md" mb="xl" align="center" spacing="md">
        {typeof icon !== "undefined" && (
          <ThemeIcon color="blue" variant="gradient" size="lg">
            {icon}
          </ThemeIcon>
        )}
        <Title sx={(theme) => ({ color: theme.colors.dark[4] })} order={4}>
          {title}
        </Title>
      </Group>
      {children}
    </Box>
  );
};

export default RouteContainer;
