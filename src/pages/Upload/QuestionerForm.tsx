import {
  Box,
  Button,
  Input,
  Loader,
  NumberInput,
  Paper,
  SegmentedControl,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useErrorCatcher } from "hooks/useErrorCatcher";
import useModels from "hooks/useModels";
import { FC, ReactElement, useCallback, useMemo, useState } from "react";
import * as yup from "yup";

export type VariableFormValues = {
  gender: string;
  occupation: string;
  age?: number;
  x1: number;
  x2: number;
  x3: number;
  x4: number;
};

const genders: string[] = ["Laki - Laki", "Perempuan"];

const initialValues: VariableFormValues = {
  gender: "Laki - Laki",
  occupation: "",
  x1: 1.0,
  x2: 1.0,
  x3: 1.0,
  age: 1,
  x4: 1.0,
};

const validationSchema = yupResolver(
  yup.object().shape({
    occupation: yup
      .string()
      .min(4, "Masukkan minimal 4 huruf")
      .required("Masukkan data pekerjaan"),
    age: yup
      .number()
      .min(4)
      .positive("Masukkan bilangan positif")
      .required("Masukkan data usia"),
    x1: yup
      .number()
      .min(1.0)
      .max(5.0)
      .positive("Masukkan bilangan positif")
      .required("Masukkan data pendapatan (X1)"),
  })
);

const VARIABLE_MAX_INPUT = 5.0;

const QuestionerForm: FC = (): ReactElement => {
  const form = useForm({
    initialValues,
    validate: validationSchema,
    validateInputOnChange: true,
  });
  const [loading, toggleLoading] = useState<boolean>(false);
  const {
    models: { Variable },
  } = useModels();
  const { errorCatcher } = useErrorCatcher();

  const ageNumberFormatter = useCallback((val?: string) => {
    return typeof val !== "undefined" ? `${val} Tahun` : " Tahun";
  }, []);

  const ageNumberParser = useCallback((val?: string) => {
    return val?.replace(/\sTahun/g, "");
  }, []);

  const onSubmit = useCallback(
    (val: VariableFormValues) => {
      toggleLoading(true);
      Variable.create(val)
        .then((resp) => {
          toggleLoading(false);
          showNotification({
            title: "Data berhasil di-input",
            message: "berhasil memasukkan 1 data",
            color: "green",
          });
          form.reset();
          console.log({ resp });
        })
        .catch(errorCatcher);
    },
    [Variable, errorCatcher, form]
  );

  const loaderRender = useMemo(
    () => (loading ? <Loader size="md" /> : undefined),
    [loading]
  );

  return (
    <Box my="md">
      <Paper p="md" withBorder radius="md" shadow="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Text weight="bold" mb="lg">
            Masukkan data melalui form
          </Text>
          <NumberInput
            label="Usia"
            min={1}
            max={120}
            {...form.getInputProps("age")}
            placeholder="Usia"
            formatter={ageNumberFormatter}
            parser={ageNumberParser}
            leftSection={loaderRender}
          />
          <Input.Wrapper
            sx={{
              "& label": {
                display: "block",
              },
            }}
            my="xs"
            label="Jenis Kelamin"
          >
            <SegmentedControl
              color="blue"
              data={genders}
              {...form.getInputProps("gender")}
            />
          </Input.Wrapper>
          <TextInput
            placeholder="Pekerjaan"
            label="Pekerjaan"
            {...form.getInputProps("occupation")}
            rightSection={loaderRender}
          />
          <NumberInput
            label="Pendapatan (X1)"
            min={1}
            max={VARIABLE_MAX_INPUT}
            step={0.01}
            precision={2}
            {...form.getInputProps("x1")}
            // rightSection={loaderRender}
          />
          <NumberInput
            label="Pendidikan (X2)"
            min={1.0}
            max={VARIABLE_MAX_INPUT}
            step={0.01}
            precision={2}
            {...form.getInputProps("x2")}
            // rightSection={loaderRender}
          />
          <NumberInput
            label="Pekerjaan (X3)"
            min={1}
            max={VARIABLE_MAX_INPUT}
            step={0.01}
            precision={2}
            {...form.getInputProps("x3")}
            // rightSection={loaderRender}
          />
          <NumberInput
            label="Jumlah Anggota Keluarga (X4)"
            min={1.0}
            max={VARIABLE_MAX_INPUT}
            step={0.01}
            precision={2}
            {...form.getInputProps("x4")}
            // rightSection={loaderRender}
          />
          <Button type="submit" my="lg" loading={loading} disabled={loading}>
            Tambah Data
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default QuestionerForm;
