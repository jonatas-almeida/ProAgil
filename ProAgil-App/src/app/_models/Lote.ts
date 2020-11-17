export interface Lote {

  id: number;
  nome: string;
  dataInicio?: Date;
  dataFim?: Date;
  quantidade: number;
  eventoId: number;

}
