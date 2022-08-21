import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges {

  @Output() onPageSizeChanged: EventEmitter<number> = new EventEmitter();
  @Output() onPageChanged: EventEmitter<number> = new EventEmitter();

  pageNumbers: number[] = [];
  totalPage: number = 1;

  @Input() pageSizes: number[] = [10, 20, 30, 50, 100];
  @Input() maxPageNumbers: number = 10;

  @Input() total: number = 0;
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = this.pageSizes[0];


  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.totalPage = this.getTotalPageCount();
    this.pageNumbers = this.getPageNumbers();
  }

  ngOnInit(): void {
  }

  pageSizeChanged() {
    this.onPageSizeChanged.emit(this.pageSize);
  }

  goToPage(pageIndex: number) {
    if (this.pageIndex === pageIndex) return;
    this.onPageChanged.emit(pageIndex);
  }

  firstPage() {
    if (this.pageIndex === 0) return;
    this.onPageChanged.emit(0);
  }

  lastPage() {
    if (this.pageIndex + 1 === this.totalPage) return;
    this.onPageChanged.emit(this.totalPage - 1);
  }

  nextPage() {
    if (this.pageIndex + 1 === this.totalPage) return;
    this.onPageChanged.emit(this.pageIndex + 1);
  }

  previousPage() {
    if (this.pageIndex === 0) return;
    this.onPageChanged.emit(this.pageIndex - 1);
  }

  getPageNumbers(): number[] {

    let start = 0;
    let length = this.totalPage;

    if (this.totalPage > this.maxPageNumbers) {
      length = this.maxPageNumbers;

      start = this.pageIndex > this.maxPageNumbers / 2 ? this.pageIndex - this.maxPageNumbers / 2 : 0;
      if (start + this.maxPageNumbers > this.totalPage)
        start = this.totalPage - this.maxPageNumbers;
    }

    return Array(length).fill(0).map((_x, i) => start + i);
  }

  getTotalPageCount() {
    return this.total < this.pageSize ? 1 : Math.ceil(this.total / this.pageSize);
  }
}
