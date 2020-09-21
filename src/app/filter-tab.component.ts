import { Component, Input, Output, EventEmitter } from '@angular/core';

declare const Liferay: any;

@Component({
  selector: 'filter-tab',
  templateUrl:
    Liferay.ThemeDisplay.getPathContext() + 
    '/o/mkpl-notices/app/filter-tab.component.html'
})
export class FilterTabComponent {
  @Input() data: {
    id: number,
    value: string,
    checked: boolean
  }[];
  @Output() valueChange = new EventEmitter();

  changeTab(id: any) {
    this.valueChange.emit(id);
  }
}
