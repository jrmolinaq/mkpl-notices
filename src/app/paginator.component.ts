import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  OnInit
} from '@angular/core';
import { DataPaginator } from './interfaces/paginator.interface';

declare const Liferay: any;

@Component({
  selector: 'paginator',
  templateUrl:
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-notices/app/paginator.component.html'
})
export class PaginatorComponent implements OnChanges, OnInit {
  currentPage = 0;
  @Input() paginator: DataPaginator;
  @Output() page: EventEmitter<number> = new EventEmitter();
  lowerLimit: number;
  upperLimit: number;
  firstPage = false;
  lastPage: boolean;
  totalElements: number;
  totalPages: number;

  ngOnInit() {
    this.loadData(this.paginator);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.paginator.firstChange) {
      this.loadData(changes.paginator.currentValue);
    }
  }

  private loadData(paginator: DataPaginator) {
    const {
      number_of_elements,
      first,
      last,
      total_pages,
      number: pageNumber,
      total_elements,
      size
    } = paginator;
    this.lowerLimit = pageNumber * size + 1;
    if (!total_elements) {
      this.lowerLimit = 0;
      this.upperLimit = 0;
    } else if (last) {
      this.upperLimit = total_elements;
    } else {
      this.upperLimit = pageNumber * number_of_elements + size;
    }
    this.currentPage = pageNumber;
    this.firstPage = first;
    this.lastPage = last;
    this.totalElements = total_elements;
    this.totalPages = total_pages;
  }

  getCurrentPage(page: number) {
    this.page.emit(page);
  }

  prevPage() {
    this.currentPage -= 1;
    this.getCurrentPage(this.currentPage);
  }

  nextPage() {
    this.currentPage += 1;
    this.getCurrentPage(this.currentPage);
  }
  gotofirstPage(){
    this.currentPage = 0;
    this.getCurrentPage(this.currentPage);
  }
  gotolastPage(){
    this.currentPage = this.totalPages - 1;
    this.getCurrentPage(this.currentPage);
  }
}
