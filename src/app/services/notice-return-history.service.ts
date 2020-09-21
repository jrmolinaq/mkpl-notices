import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoticeReturnHistoryService {

  constructor() { }

  private saved = false;
  private status: string;
  private search: string;
  private pageNumber: number;
  private limit: number;
  private orderBy: string;
  private order: string;

  savefilters(status: string, pageNumber: number, limit: number, orderBy: string, order: string, search: string) {
    this.saved = true;
    this.status = status;
    this.search = search;
    this.pageNumber = pageNumber;
    this.limit = limit;
    this.orderBy = orderBy;
    this.order = order;
  }

  getFilters(): any[] {
    const res = [this.saved, this.status, this.pageNumber, this.limit, this.orderBy, this.order, this.search];
    this.saved = false;
    return res;
  }

}
