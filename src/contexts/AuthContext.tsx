import { ReactNode, createContext, useEffect, useState } from "react";

import { ClienteDTO } from "@dtos/ClienteDTO";
import { api } from "@services/api";

import { storageAuthTokenSave } from "@storage/storageAuthToken";
import {
  storageClienteGet,
  storageClienteRemove,
  storageClienteSave,
} from "@storage/storageCliente";

export type AuthContextDataProps = {
  cliente: ClienteDTO;
  signIn: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  isLoadingClienteStorageData: boolean;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [cliente, setCliente] = useState<ClienteDTO>({} as ClienteDTO);
  const [isLoadingClienteStorageData, setIsLoadingClienteStorageData] =
    useState(true);

  async function storageClienteAndToken(
    clienteData: ClienteDTO,
    token: string
  ) {
    try {
      setIsLoadingClienteStorageData(true);

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await storageClienteSave(clienteData);
      await storageAuthTokenSave(token);
      setCliente(clienteData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingClienteStorageData(false);
    }
  }

  async function signIn(username: string, password: string) {
    try {
      const { data } = await api.post("/auth/login", {
        username,
        password,
      });

      console.log(data.token);

      if (data.cliente && data.token) {
        storageClienteAndToken(data.cliente, data.token);
      }
    } catch (error) {
      console.log("Error from backend:", error);
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingClienteStorageData(true);
      setCliente({} as ClienteDTO);
      await storageClienteRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingClienteStorageData(false);
    }
  }

  async function loadClienteData() {
    try {
      const clienteLogged = await storageClienteGet();
      if (clienteLogged) {
        setCliente(clienteLogged);
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingClienteStorageData(false);
    }
  }

  useEffect(() => {
    loadClienteData();
  }, []);

  return (
    <AuthContext.Provider
      value={{ cliente, signIn, signOut, isLoadingClienteStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
