import { IEmployee } from './../app.models';
import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
@Component({
  selector: 'employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: IEmployee[] = [];
  employee;
  clearForm:boolean = true;
  isUpdate:boolean = false;
  private _onDestroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private _appService: AppService) { }

  ngOnInit() {
    this._appService.getEmployees()
      .takeUntil(this._onDestroy$)
      .subscribe( (data) => this.employees = data);
  }

  addEmployee(employee: IEmployee){
    this.clearForm = false;
    this._appService.addEmployee(employee).then(()=>{
      alert("Employee added");

      this.clearForm = true;
      this.isUpdate = false;
    });

  }

  deleteEmployee(employee: IEmployee){
    this._appService.deleteEmployee(employee).then(()=> alert("Employee Deleted"));
  }

  updateEmployee(employee: IEmployee){
    this.clearForm = false;

    this._appService.updateEmployee(employee).then(()=>{
      alert("Employee Updated");
      this.clearForm = true;
      this.isUpdate = false;

    });
  }
  editEmployee(employee: IEmployee){
    this.employee = employee;
    this.isUpdate = true;
  }
  ngOnDestroy(){
    this._onDestroy$.next(true);
    this._onDestroy$.complete();
  }

}
