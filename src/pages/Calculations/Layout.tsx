import { Text, Title, Box } from "@mantine/core";
import RouteContainer from "components/RouteContainer";
import QuestionersData from "pages/Questioners/QuestionersData";
import { FC, ReactElement } from "react";
import { SquareRoot2 } from "tabler-icons-react";

interface IStepProps {
  title?: string;
  description?: string;
}

const Step: FC<IStepProps> = ({ title, description }): ReactElement => {
  return (
    <Box my="md">
      <Title order={4}>{title}</Title>
      <Text color="dimmed">{description}</Text>
    </Box>
  );
};

const Layout: FC = (): ReactElement => {
  document.title = "Perhitungan";
  return (
    <RouteContainer title="Perhitungan" icon={<SquareRoot2 strokeWidth={1} />}>
      <Step
        title="Langkah 1"
        description="Dengan menggunakan metode matrix membuat tabel perhitungan setiap variabel"
      />
      <QuestionersData enableMatrix />
      <Step
        title="Langkah 2"
        description="Dari persamaan normal disusun menjadi dalam bentuk matrix, dan didapatkan angka tiap matrix"
      />
    </RouteContainer>
  );
};

export default Layout;
