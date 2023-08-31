import { ReactNode, createContext, useEffect, useState } from "react";
import { ClienteDTO } from "@dtos/ClienteDTO";
import { api } from "@services/api";
import { storageClienteGet, storageClienteSave } from "@storage/storageCliente";

export type AuthContextDataProps = {
  cliente: ClienteDTO;
  signIn: (username: string, password: string) => Promise<void>;
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

  async function signIn(username: string, password: string) {
    try {
      const { data } = await api.post("/auth/login", {
        username,
        password,
      });

      if (data.cliente) {
        setCliente(data.cliente);
        storageClienteSave(data.cliente);
      }
    } catch (error) {
      console.log("Error from backend:", error);
      throw error;
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
      value={{ cliente, signIn, isLoadingClienteStorageData }}
    >
      {children}
    </AuthContext.Provider>
  );
}
