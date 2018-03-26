import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IEmployee } from './../app.models';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  @Input() employees: Array<IEmployee>;
  @Output() editEmployee : EventEmitter<IEmployee> = new EventEmitter<IEmployee>();
  @Output() deleteEmployee : EventEmitter<IEmployee> = new EventEmitter<IEmployee>();

  displayedColumns = ['name','mobile','ext','edit','delete'];
  dataSource: MatTableDataSource<IEmployee>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor() { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.employees);
    this.updateTableOperations();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(this.employees)

  }
  updateTableOperations(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
