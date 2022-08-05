import React, { useReducer, createContext, useCallback } from 'react'
import AuthProvider from 'forked.sirius.adapter/dist/libs/AuthProvider'
import UserContextReducer from './UserContextReducer';
import { UserAttributes } from 'types/global';

export interface UserContextAttributes {
  auth?: AuthProvider,
  login: boolean,
  user: UserAttributes | null,
  setAuth?: (auth: AuthProvider) => void;
  setLogin?: (user: UserAttributes) => void;
  setLogout?: () => void;
}

const initialState: UserContextAttributes = { login: false, user: null }

export const UserContext = createContext<UserContextAttributes>(initialState);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(UserContextReducer, initialState);

  const setAuth = useCallback((auth: AuthProvider) => {
    dispatch({
      type: "SET_AUTH",
      payload: { auth, login: false, user: null }
    });
  }, []);

  const setLogin = useCallback((user: UserAttributes) => {
    dispatch({
      type: "LOGIN",
      payload: { auth: state.auth, login: true, user }
    });
  }, [state])

  const setLogout = useCallback(() => {
    dispatch({
      type: "LOGOUT",
      payload: { auth: state.auth, login: false, user: null }
    });
  }, [state]);

  return (
    <UserContext.Provider value={{ ...state, setAuth, setLogin, setLogout }}>
      {children}
    </UserContext.Provider>
  )
}