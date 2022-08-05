import {useState, useMemo,} from 'react'

export const usePaginate = (initialLimit: number = 20) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(initialLimit);

  const offset = useMemo(() => ((page - 1) * limit), [page, limit]);

  return useMemo(() => ({limit, offset, page, setPage, setLimit}), [limit, offset, page, setPage, setLimit]);
}