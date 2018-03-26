import { IPurpose } from './../app.models';
import { Observable } from 'rxjs/Observable';
import { AppService } from './../app.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'purposes',
  templateUrl: './purposes.component.html',
  styleUrls: ['./purposes.component.css']
})
export class PurposesComponent implements OnInit {

  purposes: IPurpose[] = [];
  purposesSub;
  purpose:string = '';
  newPurpose:boolean = true;
  proposeId: string = '';
  displayedColumns = ['purpose','edit','delete'];
  dataSource: MatTableDataSource<IPurpose>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _appService: AppService) { }

  ngOnInit() {
    this.purposesSub = this._appService.getPurposes().subscribe(data =>{
      this.purposes = data;
      this.dataSource = new MatTableDataSource(this.purposes);
      this.updateTableOperations();
    });
    this.dataSource = new MatTableDataSource(this.purposes);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

  addPurpose(purpose){
    this._appService.addPurpose({purpose}).then(
      (result) => {
        console.log("result",result);
        this.purpose = '';
        alert("purpose added");
      },
      (error) => console.log("error",error)
    );
  }
  updatePurpose(purpose){
    this._appService.updatePurpose({
      id : this.proposeId,
      purpose : purpose
    }).then(
      (result) => {
        console.log("result",result);
        this.purpose = '';
        this.newPurpose = true;
        alert("purpose updated");
      },
      (error) => console.log("error",error)
    );
  }
  savePurpose(){
    if(this.newPurpose)
      this.addPurpose(this.purpose);
    else
      this.updatePurpose(this.purpose);
  }

  editPurpose(purpose:IPurpose){
    this.purpose = purpose.purpose;
    this.proposeId = purpose.id;
    this.newPurpose = false;
  }

  deletePurpose(purpose:IPurpose){
    this._appService.deletePurpose(purpose).then(
      (result) => alert("Purpose deleted!"),
      (error) => alert("error:" + error)
    )
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.purposesSub && this.purposesSub.unsubscribe();
  }
}
