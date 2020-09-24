import { Provider } from './provider.interface';

export interface DataPaginator {
  number: number;
  size: number;
  totalElements: number;
  sort: string;
  last: boolean;
  numberOfElements: number;
  totalPages: number;
  first: boolean;
}

export interface ListResponse extends DataPaginator {
  content: Provider[];
}

export interface Paginator {
  data: Provider[];
  dataPaginator: DataPaginator;
  date?: string;
}
