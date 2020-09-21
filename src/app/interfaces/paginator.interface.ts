import { Provider } from './provider.interface';

export interface DataPaginator {
  number: number;
  size: number;
  total_elements: number;
  sort: string;
  last: boolean;
  number_of_elements: number;
  total_pages: number;
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
