import { Text, Title, Box } from "@mantine/core";
import { AxiosAdapter } from "App";
import LoadingComponent from "components/LoadingComponent";
import RouteContainer from "components/RouteContainer";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import { FC, ReactElement, lazy, useState, useEffect } from "react";
import { SquareRoot2 } from "tabler-icons-react";
import { CalculatedMatrix } from "types/global";
import { initialMatrixState } from "./MatrixCalculations";

const QuestionersData = lazy(() => import("pages/Questioners/QuestionersData"));
const MatrixCalculations = lazy(() => import("./MatrixCalculations"));
const MatrixDeterminants = lazy(() => import("./MatrixDeterminants"));
const EquationValues = lazy(() => import("./EquationValues"));

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
  const [matrix, setMatrix] = useState<CalculatedMatrix>(initialMatrixState);
  const {errorCatcher} = useErrorCatcher();
  const [loading, toggleLoading] = useState<boolean>(true);

  useEffect(() => {
    toggleLoading(true);
    AxiosAdapter.rawGet<CalculatedMatrix>(
      "variables/calculated-variables",
      "api"
    )
      .then((resp) => {
        setMatrix(resp.data);
        toggleLoading(false);
      })
      .catch(errorCatcher);
  }, [errorCatcher]);

  document.title = `${loading ? "Loading" : ""} Perhitungan`;

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
        <MatrixCalculations matrix={matrix} />
      </LoadingComponent>
      <Step
        title="Langkah 3"
        description="Mencari determinan tiap matrix dan mendapatkan nilainya"
      />
      <LoadingComponent>
        <MatrixDeterminants matrix={matrix} />
      </LoadingComponent>
      <Step
        title="Langkah 4"
        description="Mencari nilai b1, b2, b3, b4 dan b5 untuk nantinya akan dihitung nilai persamaan regresi linear berganda"
      />
      <LoadingComponent>
        <EquationValues matrix={matrix} />
      </LoadingComponent>
    </RouteContainer>
  );
};

export default Layout;
