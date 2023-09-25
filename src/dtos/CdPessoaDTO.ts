import { CdEstadoDTO } from "./CdEstadoDTO";

export class CdPessoaDTO {
  id!: number;
  nome!: string;
  cdestado: CdEstadoDTO = new CdEstadoDTO();
  crt!: number;
}
