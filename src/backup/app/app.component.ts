import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/flatMap';
import 'rxjs/add/operator/mergeMap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { ViewChild } from '@angular/core';

export interface IVisitor{
  id?: string,
  name : string,
  mobile : number,
  avtar : string
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private visitorCollection: AngularFirestoreCollection<IVisitor>;
  visitors$ : Observable<any[]>;
  visitorForm: FormGroup;
  newVisitor:boolean = true;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  @ViewChild("avtar") avtar;

  constructor(private afs: AngularFirestore, private fb: FormBuilder, private storage: AngularFireStorage){
    this.visitorCollection = afs.collection('visitors');
    this.visitors$ = afs.collection('visitors').snapshotChanges().map(actions => {
      return actions.map( a => {
        console.log("data",a);
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    this.visitorForm = fb.group({
      id : [''],
      name : ['', Validators.required],
      mobile : ['', Validators.required],
      avtar : ['']
    });
  }

  saveVisitor(){
    let fi = this.avtar.nativeElement;
    if(fi.files && fi.files[0]){
     let sub =  this.uploadFile(fi.files[0]).subscribe(
        profile => {
          if(profile){
            this.visitorForm.controls['avtar'].setValue(profile);
            this.addVisitor();
          }

        }
      )
    }
  }

  addVisitor(){
    console.log("add visitor",this.visitorForm.value);
    if(this.newVisitor){
      this.visitorCollection.add({
        name : this.visitorForm.value.name,
        mobile : this.visitorForm.value.mobile,
        avtar : this.visitorForm.value.avtar
      });

    }
    else {
      console.log("id",this.visitorForm.value.id);
      this.afs.doc('visitors/' + this.visitorForm.value.id).update({
        name : this.visitorForm.value.name,
        mobile : this.visitorForm.value.mobile
      });
    }
    this.visitorForm.controls['name'].setValue('');
    this.visitorForm.controls['mobile'].setValue('');
    this.newVisitor = true;
  }
  deleteVisitor(id){
    this.afs.doc('visitors/'+id).delete();
  }
  editVisitor(visitor){
    this.newVisitor = false;
    this.visitorForm.controls['name'].setValue(visitor.name);
    this.visitorForm.controls['mobile'].setValue(visitor.mobile);
    this.visitorForm.controls['id'].setValue(visitor.id);
  }

  uploadFile(file) : Observable<string> {
    let isCompletePath;
    const filePath = 'visitors/' + new Date().getTime() +'_'+ file.name;
    const task = this.storage.upload(filePath, file);
    let downloadURL = task.downloadURL();
    return task.snapshotChanges().filter(snap => snap.bytesTransferred === snap.totalBytes).flatMap(a => downloadURL);
  }
}
