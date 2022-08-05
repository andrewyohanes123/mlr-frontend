import { useMemo, useCallback } from "react";
import { AxiosError } from "axios";
import {showNotification} from "@mantine/notifications";
import { X as Close } from "tabler-icons-react";
 
export const useErrorCatcher = () => {
  const errorCatcher = useCallback((error: AxiosError | any) => {
    if ("errors" in error) {
      error.errors.forEach((error: {msg: string}) => {
        showNotification({
          title: 'Terjadi Kesalahan',
          message: `${error.msg}`,
          color: 'red',
          icon: <Close size={18} />,
        })
      });
    } else {
      showNotification({
        title: 'Terjadi Kesalahan',
        message: error.toString(),
        color: 'red',
        icon: <Close size={18} />
      });
    }
  }, []);

  return useMemo(() => ({ errorCatcher }), [errorCatcher]);
};
