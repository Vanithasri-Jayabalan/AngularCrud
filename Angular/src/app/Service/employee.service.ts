import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
  baseUrl = "http://localhost:5218/api/Employee";

  GetEmplayee(): Observable<Employee[]>
  {
    return this.http.get<Employee[]>(this.baseUrl);
  }
  CreateEmployee(emp: Employee): Observable<Employee[]>
  {
    emp.id = "00000000-0000-0000-0000-000000000000";
    return this.http.post<Employee[]>(this.baseUrl, emp);

  }
  UpdateEmployee(emp: Employee): Observable<Employee[]>{
    return this.http.put<Employee[]>(this.baseUrl+'/'+emp.id,emp);
  } 
  DeleteEmployee(id: string): Observable<Employee[]>{
    return this.http.delete<Employee[]>(this.baseUrl+'/'+id);
  } 
}
