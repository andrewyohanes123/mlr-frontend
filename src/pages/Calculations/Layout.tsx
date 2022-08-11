import { Text, Title, Box } from "@mantine/core";
import LoadingComponent from "components/LoadingComponent";
import RouteContainer from "components/RouteContainer";
import { FC, ReactElement, lazy } from "react";
import { SquareRoot2 } from "tabler-icons-react";

const QuestionersData = lazy(() => import("pages/Questioners/QuestionersData"));
const MatrixCalculations = lazy(() => import("./MatrixCalculations"));
const MatrixDeterminants = lazy(() => import("./MatrixDeterminants"));

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
      <LoadingComponent>
        <QuestionersData enableMatrix />
      </LoadingComponent>
      <Step
        title="Langkah 2"
        description="Dari persamaan normal disusun menjadi dalam bentuk matrix, dan didapatkan angka tiap matrix"
      />
      <LoadingComponent>
        <MatrixCalculations />
      </LoadingComponent>
      <Step
        title="Langkah 3"
        description="Mencari determinan tiap matrix dan mendapatkan nilainya"
      />
      <LoadingComponent>
        <MatrixDeterminants />
      </LoadingComponent>
    </RouteContainer>
  );
};

export default Layout;
