//Categoria documentos
export function docCategorys(tipo: string) {
  if (tipo === "00") {
    return "TODAS AS CATEGORIAS";
  }
  if (tipo === "01") {
    return "VENDA";
  }
  if (tipo === "02") {
    return "PEDIDO";
  }
  if (tipo === "03") {
    return "ORÇAMENTO";
  }
  if (tipo === "04") {
    return "CONDICIONAL";
  }
  if (tipo === "05") {
    return "LOCAÇÃO";
  }
  if (tipo === "06") {
    return "SERVIÇO";
  }
  if (tipo === "07") {
    return "COMODATO";
  }
  if (tipo === "08") {
    return "FINANCIAMENTO";
  }
  if (tipo === "09") {
    return "BONIFICAÇÃO";
  }
  if (tipo === "10") {
    return "AMOSTRA";
  }
  if (tipo === "11") {
    return "REMESSA";
  }
  if (tipo === "12") {
    return "TRANSFERÊNCIA";
  }
  if (tipo === "13") {
    return "LICITAÇÃO";
  }
  return "Não identificado";
}
