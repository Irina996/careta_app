import { AxiosResponse } from "axios";
import {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { login as loginRequest } from "../http/userAPI";
enum ERole {
  ADMIN = "admin",
  CLIENT = "client",
}

enum EAuthSessionStorageKeys {
  TOKEN = "token",
  ROLE = "role",
}

interface IAuthSessionStorage {
  [EAuthSessionStorageKeys.TOKEN]?: string;
  [EAuthSessionStorageKeys.ROLE]?: ERole;
}

interface IAuthState {
  token?: string;
  isAuthenticated: boolean;
  role?: string;
}

interface IAuthContextValues extends IAuthState {
  logout: () => void;
  login: (props: { email: string; password: string }) => Promise<void>;
  setCredentials: (props: { token: string; role: ERole }) => void;
}

interface IAuthContextProps {
  children: ReactNode;
}

const AuthContext = createContext<IAuthContextValues | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthContextProps): ReactElement => {
  const [state, setState] = useState<IAuthState>({
    isAuthenticated: false,
  });

  const logout = () => {
    setState({
      isAuthenticated: false,
    });
    sessionStorage.removeItem(EAuthSessionStorageKeys.TOKEN);
    sessionStorage.removeItem(EAuthSessionStorageKeys.ROLE);
  };

  const login = async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    props?: {
      onSuccess?: (message: string) => void;
    }
  ) => {
    const response: AxiosResponse<{
      data: string;
      message: string;
      role: ERole;
    }> = await loginRequest(email, password);
    const { data, message, role } = response.data;

    setCredentials({ token: data, role });

    props?.onSuccess && props.onSuccess(message);
  };

  const setCredentials = ({ token, role }: { token: string; role: ERole }) => {
    setState({
      token,
      role,
      isAuthenticated: true,
    });

    sessionStorage.setItem(EAuthSessionStorageKeys.TOKEN, token);
    sessionStorage.setItem(EAuthSessionStorageKeys.ROLE, role);
  };

  useEffect(() => {
    const token =
      sessionStorage.getItem(EAuthSessionStorageKeys.TOKEN) || undefined;
    const role =
      (sessionStorage.getItem(EAuthSessionStorageKeys.ROLE) as ERole) ||
      undefined;
    setState({
      token,
      role,
      isAuthenticated: !!token,
    });
  }, [
    sessionStorage.getItem(EAuthSessionStorageKeys.TOKEN),
    sessionStorage.getItem(EAuthSessionStorageKeys.ROLE),
  ]);

  // const state = useMemo<IAuthState>(() => {
  //   const token = sessionStorage.getItem(EAuthSessionStorageKeys.TOKEN) || undefined;
  //   const role = sessionStorage.getItem(EAuthSessionStorageKeys.ROLE) as ERole || undefined;
  //   return {
  //     token,
  //     isAuthenticated: !!token,
  //     role,
  //   };
  // }, [sessionStorage.getItem(EAuthSessionStorageKeys.TOKEN), sessionStorage.getItem(EAuthSessionStorageKeys.ROLE)]);

  return (
    <AuthContext.Provider value={{ ...state, logout, login, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("You should use AuthContext only with AuthProvider");
  }

  return context;
};
