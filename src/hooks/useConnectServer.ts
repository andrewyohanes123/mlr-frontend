import Adapter, {IModelFactory} from 'forked.sirius.adapter';
import AuthProvider from 'forked.sirius.adapter/dist/libs/AuthProvider';
import {useCallback, useEffect, useMemo, useState} from 'react';
import { UserAttributes } from 'types/global';
import useAuth from './useAuth';
import useModels from './useModels';

export const useConnectServer = (Connect: Adapter) => {
  const [localModels, setLocalModels] = useState<IModelFactory>({});
  const [ready, toggleReady] = useState<boolean>(false);
  const [error, toggleError] = useState<boolean>(false);
  const {setAuth, setLogin, setLogout, auth} = useAuth();
  const {setModels} = useModels();

  const connect = useCallback(() => {
    toggleReady(false);
    Connect.connect()
      .then(models => {
        setLocalModels(models);
        toggleError(false);
        console.log('connect');
      })
      .catch(e => {
        console.log(e);
        toggleError(true);
      });
    // eslint-disable-next-line
  }, [toggleError, setLocalModels, Connect]);

  useEffect(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (typeof auth !== 'undefined') {
      Connect.getAuthProvider()
        .get()
        .then((user): void => {
          setLogin(user as UserAttributes);
          toggleReady(true);
        })
        .catch(e => {
          console.log(e);
          setLogout!();
          toggleReady(true);
        });
    }
    // eslint-disable-next-line
  }, [auth, Connect]);

  useEffect(() => {
    if (Object.keys(localModels).length > 0) {
      setModels(localModels);
      const auth: AuthProvider = Connect.getAuthProvider();
      setAuth(auth);
    }

    // eslint-disable-next-line
  }, [localModels, Connect]);

  return useMemo(
    () => ({error, ready, tryAgain: connect}),
    [error, ready, connect],
  );
};
