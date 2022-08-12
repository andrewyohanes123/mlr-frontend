import { Loader, LoadingOverlay, Pagination, Table } from "@mantine/core";
import { AxiosAdapter } from "App";
import RouteContainer from "components/RouteContainer";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";
import { usePaginate } from "hooks/usePaginate";
import { initialMatrixState } from "pages/Calculations/MatrixCalculations";
import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { ChartInfographic } from "tabler-icons-react";
import {
  CalculatedMatrix,
  ModelResult,
  VariableAttributes,
} from "types/global";

const Layout: FC = (): ReactElement => {
  const {
    models: { Variable },
  } = useModels();
  const [variables, setVariables] = useState<ModelResult<VariableAttributes>>({
    rows: [],
    count: 0,
  });
  const { errorCatcher } = useErrorCatcher();
  const { page, setPage, limit, offset } = usePaginate(100);
  const [matrix, setMatrix] = useState<CalculatedMatrix>(initialMatrixState);
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

  const getVariables = useCallback(() => {
    toggleLoading(true);
    Variable.collection({
      limit,
      offset,
      attributes: ["age", "occupation", "gender", "x1", "x2", "x3", "x4"],
    })
      .then((resp) => {
        toggleLoading(false);
        setVariables(resp as ModelResult<VariableAttributes>);
      })
      .catch(errorCatcher);
  }, [Variable, errorCatcher, limit, offset]);

  useEffect(() => {
    getVariables();
  }, [getVariables]);

  const tableHeaders = useMemo(
    () => (
      <tr>
        <th>No.</th>
        <th>b1</th>
        <th>b2X1</th>
        <th>b3X2</th>
        <th>b4X3</th>
        <th>b5X4</th>
        <th>Hasil</th>
        <th>Range Nilai Y</th>
      </tr>
    ),
    []
  );

  const tableData = useMemo(
    () =>
      variables.rows.map((row, idx) => {
        const b2x1 = Math.fround(row.x1 * matrix.b2);
        const b3x2 = Math.fround(row.x2 * matrix.b3);
        const b4x3 = Math.fround(row.x3 * matrix.b4);
        const b5x4 = Math.fround(row.x4 * matrix.b5);

        const bxTotal = Math.fround(b2x1 + b3x2 + b4x3 + b5x4);

        return (
          <tr key={`${row.age}${row.created_at}${row.id}`}>
            <td>{idx + 1}</td>
            <td>{matrix.b1}</td>
            <td>{b2x1.toFixed(3)}</td>
            <td>{b3x2.toFixed(3)}</td>
            <td>{b4x3.toFixed(3)}</td>
            <td>{b5x4.toFixed(3)}</td>
            <td>{bxTotal.toFixed(3)}</td>
            <td>
              {bxTotal >= 4.2
                ? 5
                : bxTotal >= 3.4
                ? 4
                : bxTotal >= 2.6
                ? 3
                : bxTotal >= 1.8
                ? 2
                : 1}
            </td>
          </tr>
        );
      }),
    [matrix.b1, matrix.b2, matrix.b3, matrix.b4, matrix.b5, variables.rows]
  );

  const totalPages = useMemo(
    () => Math.ceil(variables.count / limit),
    [limit, variables.count]
  );

  return (
    <RouteContainer
      icon={<ChartInfographic />}
      title="Hasil Perhitungan"
    >
      <LoadingOverlay visible={loading} overlayBlur={2} loader={<Loader variant="dots" size="xl" />} />
      <Pagination
        align="center"
        total={totalPages}
        page={page}
        onChange={setPage}
      />
      <Table striped>
        <thead>
          {tableHeaders}
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </Table>
      <Pagination
        align="center"
        total={totalPages}
        page={page}
        onChange={setPage}
      />
    </RouteContainer>
  );
};

export default Layout;
