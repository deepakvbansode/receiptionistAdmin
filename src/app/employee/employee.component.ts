import { IEmployee } from './../app.models';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() clearForm;
  @Input() isUpdate;
  @Output() onUpdate = new EventEmitter<IEmployee>();
  @Output() onAdd = new EventEmitter<IEmployee>();
  employeeForm: FormGroup;
  submitBtnTitle:string =  'Add';
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
        'name' : ['', Validators.required],
        'mobile' : ['', Validators.required],
        'ext' : ['', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log("changes",changes);
    if(changes['clearForm'] && changes.clearForm.currentValue == true){
      this.clearTheForm();
    }

    if(changes['isUpdate'] && changes.isUpdate.currentValue == true && changes.isUpdate.previousValue == false){
      this.clearTheForm();
      this.submitBtnTitle = 'Update';
      this.updateFormWithValues(changes.data.currentValue);
    }
  }
  ngOnInit() {
    console.log("changes");
  }
  clearTheForm(){
    // this.employeeForm.controls['name'].patchValue('');
    // this.employeeForm.controls['mobile'].patchValue('');
    // this.employeeForm.controls['ext'].patchValue('');
    this.employeeForm.reset();
  }
  updateFormWithValues(data){
    this.employeeForm.controls['name'].patchValue(data.name);
    this.employeeForm.controls['mobile'].patchValue(data.mobile);
    this.employeeForm.controls['ext'].patchValue(data.ext);
  }
  save(){
    if(this.employeeForm.valid){

      let employee:IEmployee = {
        name : this.employeeForm.controls['name'].value,
        mobile : this.employeeForm.controls['mobile'].value,
        role : 'admin',
        ext : this.employeeForm.controls['ext'].value,
      };
      if(this.isUpdate){
        employee['id'] = this.data.id;
        this.onUpdate.emit(employee);
      }
      else{
        this.onAdd.emit(employee);
      }

    }

  }
}
