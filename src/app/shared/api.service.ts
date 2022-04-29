import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  postEmployee(data: any) {
    return this.http
      .post<any>('https://kochar-server.herokuapp.com/api/v1/employees', data)
      .pipe(map((response: any) => response));
  }
  getEmployee() {
    return this.http
      .get<any>('https://kochar-server.herokuapp.com/api/v1/employees')
      .pipe(map((response: any) => response));
  }
  updateEmployee(data: any, id: number) {
    return this.http
      .patch<any>(
        'https://kochar-server.herokuapp.com/api/v1/employees/' + id,
        data
      )
      .pipe(map((response: any) => response));
  }
  deleteEmployee(id: number) {
    return this.http
      .delete<any>(`https://kochar-server.herokuapp.com/api/v1/employees/${id}`)
      .pipe(map((response: any) => response));
  }
}
