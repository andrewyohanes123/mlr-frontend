import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Center, Loader, Pagination, Table } from "@mantine/core";
import { Forms } from "tabler-icons-react";
import { ModelResult, VariableAttributes } from "types/global";
import RouteContainer from "components/RouteContainer";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";
import { usePaginate } from "hooks/usePaginate";

const Layout: FC = (): ReactElement => {
  const {
    models: { Variable },
  } = useModels();
  const [variables, setVariables] = useState<ModelResult<VariableAttributes>>({
    rows: [],
    count: 0,
  });
  const { errorCatcher } = useErrorCatcher();
  const { page, setPage, limit, offset } = usePaginate(20);
  const [loading, toggleLoading] = useState<boolean>(false);

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

  const tableTitle = useMemo(
    () => (
      <tr>
        <th>No.</th>
        <th>Usia</th>
        <th>Jenis Kelamin</th>
        <th>Pekerjaan</th>
        <th>Pendapatan {"(X1)"}</th>
        <th>Pendidikan {"(X2)"}</th>
        <th>Pekerjaan {"(X3)"}</th>
        <th>Jumlah Anggota Keluarga {"(X4)"}</th>
        <th>Y</th>
        <th>Nilai Y</th>
      </tr>
    ),
    []
  );

  const tableData = useMemo(
    () =>
      variables.rows.map(({ x1, x2, x3, x4, ...variable }, idx) => {
        const scoreAvg = Math.fround((x1 + x2 + x3 + x4) / 4);
        return (
          <tr key={`${idx}${variable.id}v${scoreAvg + variable.id}`}>
            <td>{idx + 1}</td>
            <td>{variable.age} tahun</td>
            <td>{variable.gender}</td>
            <td>{variable.occupation}</td>
            <td>{x1}</td>
            <td>{x2}</td>
            <td>{x3}</td>
            <td>{x4}</td>
            <td>{scoreAvg.toFixed(2)}</td>
            <td>
              {scoreAvg >= 4.2
                ? 5
                : scoreAvg >= 3.4
                ? 4
                : scoreAvg >= 2.6
                ? 3
                : scoreAvg >= 1.8
                ? 2
                : 1}
            </td>
          </tr>
        );
      }),
    [variables.rows]
  );

  const totalPages = useMemo(
    () => Math.ceil(variables.count / limit),
    [limit, variables.count]
  );

  return (
    <RouteContainer title="Data Kuesioner" icon={<Forms strokeWidth={1} />}>
      <Table verticalSpacing="md" my="md" striped>
        <thead>{tableTitle}</thead>
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={10}>
                <Center>
                  <Loader variant="bars" size="xl" />
                </Center>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>{tableData}</tbody>
        )}
        <tfoot>{tableTitle}</tfoot>
      </Table>
      <Pagination total={totalPages} page={page} onChange={setPage} />
    </RouteContainer>
  );
};

export default Layout;
