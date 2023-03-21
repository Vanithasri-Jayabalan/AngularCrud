import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Employee } from './Model/employee';
import { EmployeeService } from './Service/employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private empService: EmployeeService,
    private formBuild: FormBuilder
  ) {
    this.employeeFormGroup = this.formBuild.group({
      id: [''],
      name: [''],
      mobileNumber: [''],
      emailId: [''],
    });
  }
  public employee: Employee[] = [];
  public employeeFormGroup: FormGroup;
  ngOnInit(): void {
    this.getEmployee();
  }
  title = 'crud';

  getEmployee(): void {
    this.empService.GetEmplayee().subscribe((res) => (this.employee = res));
  }

  OnSubmit() {
    if (
      this.employeeFormGroup.value.id != null &&
      this.employeeFormGroup.value.id != ''
    ) {
      this.empService
        .UpdateEmployee(this.employeeFormGroup.value)
        .subscribe((res) => console.log(res));
      console.log(this.employeeFormGroup.value);
      this.getEmployee();
      this.employeeFormGroup.setValue({
        id: '',
        name: '',
        mobileNumber: '',
        emailId: '',
      });
    } else {
      this.empService
        .CreateEmployee(this.employeeFormGroup.value)
        .subscribe((res) => console.log(res));
      console.log(this.employeeFormGroup.value);
      this.employeeFormGroup.setValue({
        id: '',
        name: '',
        mobileNumber: '',
        emailId: '',
      });
      this.getEmployee();
    }
  }

  editEmployee(emp: Employee) {
    this.employeeFormGroup.setValue({
      id: emp.id,
      name: emp.name,
      mobileNumber: emp.mobileNumber,
      emailId: emp.emailId,
    });
  }

  deleteEmployee(id: string) {
    this.empService.DeleteEmployee(id).subscribe((res) => {
      console.log(res);
      this.getEmployee();
    });
  }
}
