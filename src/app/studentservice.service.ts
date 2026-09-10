import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Studentclass } from './studentclass';

@Injectable({
  providedIn: 'root'
})
export class StudentserviceService {

  private url='http://localhost:3000/Stud';
  constructor(private http:HttpClient) { }


  getAll():Observable<Studentclass[]>{
    return this.http.get<Studentclass[]>(this.url)
  }


  addstud(student: Studentclass): Observable<Studentclass> {
    return this.http.post<Studentclass>(this.url, student);
  }

  updatestud(id: number, data: Studentclass): Observable<Studentclass> {
    return this.http.put<Studentclass>(`${this.url}/${id}`, data);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }

}
