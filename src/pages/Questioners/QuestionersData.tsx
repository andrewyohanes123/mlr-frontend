import {
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Box,
  Center,
  Divider,
  Loader,
  LoadingOverlay,
  Pagination,
  Table,
  Text,
} from "@mantine/core";
import { ModelResult, VariableAttributes } from "types/global";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";
import { usePaginate } from "hooks/usePaginate";
import { Th } from "components";
import QuestionersMatrix from "./QuestionersMatrix";

interface props {
  enableMatrix?: boolean;
}

const QuestionersData: FC<props> = ({ enableMatrix = false }): ReactElement => {
  const {
    models: { Variable },
  } = useModels();
  const [variables, setVariables] = useState<ModelResult<VariableAttributes>>({
    rows: [],
    count: 0,
  });
  const { errorCatcher } = useErrorCatcher();
  const { page, setPage, limit, offset } = usePaginate(100);
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
        <Th>No.</Th>
        <Th>Usia</Th>
        <Th>Jenis Kelamin</Th>
        <Th align="center">Pekerjaan</Th>
        <Th>Pendapatan {"(X1)"}</Th>
        <Th>Pendidikan {"(X2)"}</Th>
        <Th>Pekerjaan {"(X3)"}</Th>
        <Th>Jumlah Anggota Keluarga {"(X4)"}</Th>
        <Th>Y</Th>
        <Th>Nilai Y</Th>
      </tr>
    ),
    []
  );

  const tableFooter = useMemo(() => {
    return (
      <Box
        component="tr"
        sx={({ colors, radius }) => ({
          background: colors.grape[8],
          "& div": {
            color: "white",
          },
        })}
      >
        <th colSpan={4}>
          <Text sx={{ textAlign: "right" }} weight="bold">
            Jumlah
          </Text>
        </th>
        <Th
          sx={(theme) => ({
            background: theme.fn.linearGradient(90, "red", "blue"),
          })}
        >
          <Text sx={{ textAlign: "center" }} weight="bold">
            {variables.rows.length > 0
              ? variables.rows
                  .map((v) => v.x1)
                  .reduce((a, b) => a + b)
                  .toFixed(2)
              : 0}
          </Text>
        </Th>
        <th>
          <Text sx={{ textAlign: "center" }} color="white" weight="bold">
            {variables.rows.length > 0
              ? variables.rows
                  .map((v) => v.x2)
                  .reduce((a, b) => a + b)
                  .toFixed(2)
              : 0}
          </Text>
        </th>
        <th>
          <Text sx={{ textAlign: "center" }} weight="bold">
            {variables.rows.length > 0
              ? variables.rows
                  .map((v) => v.x3)
                  .reduce((a, b) => a + b)
                  .toFixed(2)
              : 0}
          </Text>
        </th>
        <th>
          <Text sx={{ textAlign: "center" }} weight="bold">
            {variables.rows.length > 0
              ? variables.rows
                  .map((v) => v.x4)
                  .reduce((a, b) => a + b)
                  .toFixed(2)
              : 0}
          </Text>
        </th>
        <th colSpan={2}>
          <Text weight="bold">
            {variables.rows.length > 0
              ? variables.rows
                  .map((v) => Math.fround((v.x1 + v.x2 + v.x3 + v.x4) / 4))
                  .reduce((a, b) => a + b)
                  .toFixed(2)
              : 0}
          </Text>
        </th>
      </Box>
    );
  }, [variables.rows]);

  const tableData = useMemo(
    () =>
      variables.rows.map(({ x1, x2, x3, x4, ...variable }, idx) => {
        const scoreAvg = Math.fround((x1 + x2 + x3 + x4) / 4);
        return (
          <tr key={`${idx}${variable.id}v${scoreAvg + variable.id}`}>
            <td>
              <Text align="center">{idx + 1}</Text>
            </td>
            <td>
              <Text align="center">{variable.age} tahun</Text>
            </td>
            <td>
              <Text align="center">{variable.gender}</Text>
            </td>
            <td>
              <Text align="center">{variable.occupation}</Text>
            </td>
            <td>
              <Text align="center">{x1}</Text>
            </td>
            <td>
              <Text align="center">{x2}</Text>
            </td>
            <td>
              <Text align="center">{x3}</Text>
            </td>
            <td>
              <Text align="center">{x4}</Text>
            </td>
            <td>
              <Text align="center">{scoreAvg.toFixed(2)}</Text>
            </td>
            <td>
              <Text variant="gradient" align="center" weight="bold">
                {scoreAvg >= 4.2
                  ? 5
                  : scoreAvg >= 3.4
                  ? 4
                  : scoreAvg >= 2.6
                  ? 3
                  : scoreAvg >= 1.8
                  ? 2
                  : 1}
              </Text>
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
    <Box sx={{ position: "relative" }}>
      <Pagination
        align="center"
        total={totalPages}
        page={page}
        onChange={setPage}
      />
      <Table
        sx={({ radius }) => ({ borderRadius: radius.md })}
        align="center"
        verticalSpacing="md"
        my="md"
        striped
      >
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
        {variables.rows.length > 0 && <tfoot>{tableFooter}</tfoot>}
      </Table>
      {enableMatrix && (
        <>
          <Divider size="sm" my="xl" variant="dashed" />
          <LoadingOverlay visible={loading} overlayBlur={2} />
          <QuestionersMatrix data={variables.rows} />
        </>
      )}
      <Pagination
        align="center"
        total={totalPages}
        page={page}
        onChange={setPage}
      />
    </Box>
  );
};

export default QuestionersData;
