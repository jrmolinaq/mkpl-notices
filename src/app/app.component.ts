import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TAB_FILTERS, EMPTY_NOTICES } from './constants/notices-list-constants';
import { DataPaginator } from './interfaces/paginator.interface';
import { NoticePaginator } from './interfaces/notices.interface';
import { setDaysFromToday } from './utils/date.utils';
import { NoticeService } from './services/notice.service';
import { NoticeReturnHistoryService } from './services/notice-return-history.service';
import { FormGroup, FormBuilder } from '@angular/forms';

declare const Liferay: any;

@Component({
	templateUrl: 
		Liferay.ThemeDisplay.getPathContext() + 
		'/o/mkpl-notices/app/app.component.html'
})
export class AppComponent implements OnInit, AfterContentInit, AfterViewInit {
	@ViewChild('inputText', { static: false }) el: ElementRef;
  
	emptyNotices = EMPTY_NOTICES;
	tabFilters = TAB_FILTERS;
	$notices: Observable<NoticePaginator>;
	paginator: DataPaginator;
	status = 'all';
	buscar = '';
	page = 0;
	order = 'ascending';
	orderBy = 'id';
	limit = 10;
	pageNumber: number;
	selectedElement: number;
	selectForm: FormGroup;
  
	elementNumber = [
	  { value: 10,  display: '10  elementos' },
	  { value: 20,  display: '20  elementos' },
	  { value: 30,  display: '30  elementos' },
	  { value: 50,  display: '50  elementos' },
	  { value: 100, display: '100 elementos' }
	];
  
	constructor(private noticeService: NoticeService,
				private noticeHistoryService: NoticeReturnHistoryService,
				private fb: FormBuilder) { }
  
	ngOnInit() {
	  const filters = this.noticeHistoryService.getFilters();
  
	  if ( filters[0] ) {
		this.status = filters[1];
		this.pageNumber = filters[2];
		this.limit = filters[3];
		this.orderBy = filters[4];
		this.order = filters[5];
		this.buscar = filters[6];
  
		if (this.buscar !== '') {
		  this.$notices = this.noticeService
		  .getNoticesFilter(this.buscar.toUpperCase(), this.pageNumber, this.limit, this.orderBy, this.order)
		  .pipe(map(this.setDaysFromDates), tap(this.setPaginator));
		} else {
		  this.changeFilter(this.status, this.pageNumber, this.limit);
		}
	  } else {
		this.buscar = '';
		this.pageNumber = 0;
		this.limit = 10;
		this.orderBy = 'ascending';
		this.order = 'id';
		this.setNotices();
	  }
	}
  
	currentPageChange(currentPage: number): void {
	  this.pageNumber = currentPage;
  
	  if (this.order === 'date' || this.order === 'city') {
		if (this.buscar !== '') {
		  this.$notices = this.noticeService
		  .getNoticesFilter(this.buscar.toUpperCase(), currentPage, this.limit, this.orderBy, this.order)
		  .pipe(map(this.setDaysFromDates), tap(this.setPaginator));
		} else {
		  this.setNoticesCity(currentPage, this.orderBy, this.order, this.limit);
		}
	  } else {
		if (this.buscar !== '') {
		  this.$notices = this.noticeService
		  .getNoticesFilter(this.buscar.toUpperCase(), currentPage, this.limit)
		  .pipe(map(this.setDaysFromDates), tap(this.setPaginator));
		} else {
		  this.setNotices(currentPage, this.limit);
		}
	  }
	}
  
	changeFilter(state: string, page = 0, limit = 10): void {
	  this.buscar = '';
	  this.status = state;
  
	  this.tabFilters = this.tabFilters.map(radio => ({
		...radio,
		checked:  radio.id === state
	  }));
  
	  this.setNotices(page, limit);
	}
  
	private setNotices(page = 0, limit = 10): void {
	  this.$notices = this.noticeService
		.getNotices(this.status, page, limit, this.orderBy, this.order)
		.pipe(map(this.setDaysFromDates), tap(this.setPaginator));
	}
  
	ngAfterContentInit() {
	  this.selectForm = this.fb.group({
		selectControl: [this.limit]
	  });
	}
  
	ngAfterViewInit() {
	  this.el.nativeElement.value = this.buscar;
	}
  
	private setDaysFromDates({ data, ...dataPaginator }: NoticePaginator): NoticePaginator {
	  const withDays = data.map(({ date, ...notice }) => ({
		...notice,
		date: setDaysFromToday(date)
	  }));
	  return {
		data: withDays,
		...dataPaginator
	  };
	}
  
	private setPaginator({ data, ...dataPaginator }: NoticePaginator): void {
	  this.paginator = dataPaginator;
	}
  
	searchItem(item: string) {
	  this.buscar = item;
  
	  if (item !== '') {
		this.status = 'all';
  
		this.tabFilters = this.tabFilters.map(radio => ({
		  ...radio,
		  checked:  radio.id === 'all'
		}));
  
		this.$notices = this.noticeService
		  .getNoticesFilter(this.buscar.toUpperCase(), 0, this.limit)
		  .pipe(map(this.setDaysFromDates), tap(this.setPaginator));
	  }
	}
  
	refresh() {
	  this.buscar = '';
	  this.el.nativeElement.value = '';
	  this.setNotices(0, this.limit);
	}
  
	handleNotices(orderby: string, ordertype: string) {
	  this.order = ordertype;
	  this.orderBy = orderby;
  
	  if (this.buscar !== '') {
		this.$notices = this.noticeService
		.getNoticesFilter(this.buscar.toUpperCase(), this.page, this.limit, orderby, ordertype)
		.pipe(map(this.setDaysFromDates), tap(this.setPaginator));
	  } else {
		this.setNoticesCity(this.page, orderby, ordertype, this.limit);
	  }
	}
  
	private setNoticesCity(page: number, orderBy: string, order: string, limit: number): void {
	  this.$notices = this.noticeService
		.getNotices(this.status, page, limit, orderBy, order)
		.pipe(map(this.setDaysFromDates), tap(this.setPaginator));
	}
  
	newValue(newValue: number) {
	  this.limit = newValue;
  
	  if (this.buscar !== '') {
		this.$notices = this.noticeService
		.getNoticesFilter(this.buscar.toUpperCase(), 0, this.limit, this.orderBy, this.order)
		.pipe(map(this.setDaysFromDates), tap(this.setPaginator));
	  } else {
		this.setNotices( 0, this.limit);
	  }
	}
  
	saveFilters() {
	  this.noticeHistoryService.savefilters(this.status, this.pageNumber, this.limit, this.orderBy, this.order, this.buscar);
	}
}
