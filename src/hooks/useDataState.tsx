import ModelInstance from "forked.sirius.adapter/dist/libs/ModelInstance";
import { useState, useMemo } from "react";
import { ModelResult } from "types/global";

export function useDataState<T extends ModelInstance>() {
  const [data, setData] = useState<ModelResult<T>>({rows: [], count: 0});
  const [singleData, setSingleData] = useState<T | undefined>(undefined);

  return useMemo(() => ({data, setData, singleData, setSingleData}), [data, singleData, setData, setSingleData]);
}