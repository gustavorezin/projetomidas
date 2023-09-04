import { ReactNode, createContext, useEffect, useState } from "react";

import { ClienteDTO } from "@dtos/ClienteDTO";
import { api } from "@services/api";

import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@storage/storageAuthToken";
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

  function clienteAndTokenUpdate(clienteData: ClienteDTO, token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    setCliente(clienteData);
  }

  async function signIn(username: string, password: string) {
    try {
      const { data } = await api.post("/auth/login", {
        username,
        password,
      });

      console.log(data.token);

      if (data.cliente && data.token) {
        setIsLoadingClienteStorageData(true);
        await storageClienteSave(data.cliente);
        await storageAuthTokenSave(data.token);
        clienteAndTokenUpdate(data.cliente, data.token);
      }
    } catch (error) {
      console.log("Error from backend:", error);
      throw error;
    } finally {
      setIsLoadingClienteStorageData(false);
    }
  }

  async function signOut() {
    try {
      setIsLoadingClienteStorageData(true);
      setCliente({} as ClienteDTO);
      await storageClienteRemove();
      await storageAuthTokenRemove();
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingClienteStorageData(false);
    }
  }

  async function loadClienteData() {
    try {
      setIsLoadingClienteStorageData(true);
      const clienteLogged = await storageClienteGet();
      const token = await storageAuthTokenGet();

      if (clienteLogged && token) {
        clienteAndTokenUpdate(clienteLogged, token);
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
