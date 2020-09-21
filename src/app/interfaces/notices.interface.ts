import { DataPaginator } from './paginator.interface';

export interface Notice {
  id: number;
  externalEvent: number;
  number: number;
  plate: string;
  date: string;
  brand: string;
  line: string;
  workshop: string;
  city: string;
  status: string;
}

export interface ManualPurchase {
  date: string;
  orderId: number;
  noticeId: number;
  cantProducts: number;
  cantManualProducts: number;
}

export interface ListNoticeResponse extends DataPaginator {
  content: Notice[];
}

export interface NoticePaginator extends DataPaginator {
  data: Notice[];
}

export interface ListManualPurchaseResponse extends DataPaginator {
  content: ManualPurchase[];
}

export interface ManualPurchasePaginator extends DataPaginator {
  data: ManualPurchase[];
}
