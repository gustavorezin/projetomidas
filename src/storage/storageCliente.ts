import AsyncStorage from "@react-native-async-storage/async-storage";

import { ClienteDTO } from "@dtos/ClienteDTO";
import { CLIENTE_STORAGE } from "./storageConfig";

export async function storageClienteSave(cliente: ClienteDTO) {
  await AsyncStorage.setItem(CLIENTE_STORAGE, JSON.stringify(cliente));
}

export async function storageClienteGet() {
  const storage = await AsyncStorage.getItem(CLIENTE_STORAGE);
  const cliente: ClienteDTO = storage ? JSON.parse(storage) : {};
  return cliente;
}
