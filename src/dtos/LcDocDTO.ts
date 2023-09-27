import { CdNfeCfgDTO } from "./CdNfeCfgDTO";
import { CdPessoaDTO } from "./CdPessoaDTO";
import { CdProdutoTabDTO } from "./CdProdutoTabDTO";

export class LcDoc {
  id!: Number;
  tipo!: String;
  dataem!: any;
  cdpessoaemp: CdPessoaDTO = new CdPessoaDTO();
  cdpessoapara: CdPessoaDTO = new CdPessoaDTO();
  cdpessoavendedor: CdPessoaDTO = new CdPessoaDTO();
  cdnfecfg: CdNfeCfgDTO = new CdNfeCfgDTO();
  categoria!: String;
  cdprodutotab: CdProdutoTabDTO = new CdProdutoTabDTO();
  status!: String;
}
