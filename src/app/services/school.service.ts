import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SchoolData {
  name: string;
  id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SchoolService {
  
  private students: Array<SchoolData> = [
    {
      name: 'Felipe',
      id: '1',
    },
    {
      name: 'João',
      id: '2',
    },
    {
      name: 'Marcia',
      id: '3',
    },
  ];

  private teachers: Array<SchoolData> = [
    {
      name: 'Luiz',
      id: '1',
    },
    {
      name: 'Gabriel',
      id: '2',
    },
    {
      name: 'Joaquim',
      id: '3',
    }
  ];

  public getStudents(): Observable<Array<SchoolData>> {
    return of(this.students);
  }

  public getTeachers(): Observable<Array<SchoolData>> {
    return of(this.teachers);
  }



}
