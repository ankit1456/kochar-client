import { Router } from '@angular/router';
import { ApiService } from './../shared/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  employeeData: any;
  showAdd: boolean = true;
  showUpdate: boolean = true;

  employeeModelObj: EmployeeModel = new EmployeeModel();
  constructor(
    private formbuilder: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      employeeName: [''],
      email: [''],
      mobile: [0],
      age: [0],
    });
    this.getAllEmployees();
  }

  AddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postEmployeeDetails() {
    this.employeeModelObj.employeeName = this.formValue.value.employeeName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.age = this.formValue.value.age;

    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Employee added successfully 😊');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployees();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }

  getAllEmployees() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res.data.docs;
    });
  }
  deleteEmployee(row: any) {
    this.api.deleteEmployee(row._id).subscribe((res) => {
      alert('Employee deleted successfully');
      this.getAllEmployees();
    });
  }
  onEdit(row: any) {
    this.employeeModelObj.id = row._id;
    this.showAdd = false;
    this.showUpdate = true;
    this.formValue.controls['employeeName'].setValue(row.employeeName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['age'].setValue(row.age);
  }

  updateEmployee() {
    this.employeeModelObj.employeeName = this.formValue.value.employeeName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobile = this.formValue.value.mobile;
    this.employeeModelObj.age = this.formValue.value.age;

    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('Updated successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployees();
      });
  }
}
