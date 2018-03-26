import { IPurpose, IEmployee } from './app.models';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class AppService {
  private purposeCollection: AngularFirestoreCollection<IPurpose>;
  private purpose: AngularFirestoreDocument<IPurpose>
  private purposes$: Observable<IPurpose[]>;

  private employeeCollection: AngularFirestoreCollection<IEmployee>;
  private employee: AngularFirestoreDocument<IPurpose>;
  private employees$: Observable<IEmployee[]>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.initPurpose();
    this.initEmpoyee();
  }

  //-------------------Start purpose-----------
  private initPurpose(){
    this.purposeCollection = this.afs.collection('purposes');
    this.purposes$ = this.purposeCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data } as IPurpose;
      });
    });
  }

  getPurposes(){
    return this.purposes$;
  }

  addPurpose(purpose:IPurpose){
    return this.purposeCollection.add({
      purpose : purpose.purpose
    });
  }

  deletePurpose(purpose:IPurpose){
    this.purpose = this.afs.doc('purposes/'+ purpose.id);
    return this.purpose.delete();
  }

  updatePurpose(purpose:IPurpose){
    let purposeId = purpose.id;
    delete purpose.id;
    this.purpose = this.afs.doc('purposes/'+purposeId);
    return this.purpose.update({
      purpose : purpose.purpose
    });
  }

  //-------------------End purpose------------------------------

  //-------------------Start Employee-----------------
  private initEmpoyee(){
    this.employeeCollection = this.afs.collection('employees');
    this.employees$ = this.employeeCollection.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data } as IEmployee;
      });
    });
  }

  getEmployees() : Observable<IEmployee[]>{
    return this.employees$;
  }

  addEmployee(employee: IEmployee){
    return this.employeeCollection.add(employee);
  }

  deleteEmployee(employee: IEmployee){
    this.employee = this.afs.doc('employees/'+employee.id);
    return this.employee.delete();
  }

  updateEmployee(employee: IEmployee){
    let employeeId = employee.id;
    delete employee.id;
    this.employee = this.afs.doc('employees/'+employeeId);
    return this.employee.update(employee);
  }
  //-------------------End Employee-----------------
}
