import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { filter, from, map, of, Subject, switchMap, takeUntil, zip } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  private schoolService = inject(SchoolService);

  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];

  private zipSchoolResponses$ = zip(
    this.schoolService.getStudents(),
    this.schoolService.getTeachers()
  );

  private readonly destroy$: Subject<void> = new Subject();

  private ages = of(20, 30, 40, 50, 60, 70);
  private peopleData = from([
    {
      name: 'Felipe',
      age: 33,
      profession: 'Software Developer'
    },
    {
      name: 'Otavio',
      age: 3,
      profession: 'UX Developer'
    },
    {
      name: 'Joaquim',
      age: 1,
      profession: 'Back-end Developer'
    },
    {
      name: 'Jeniffer',
      age: 12,
      profession: 'Back-end Developer'
    },
  ]);

  private studentUserId = '2';

  ngOnInit(): void {
    this.handleFindStudentsById();
  }

  public getSchoolData(): void {
    this.zipSchoolResponses$
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next:(response: [SchoolData[], SchoolData[]]) => {
        console.log('STUDENTS', response[0])
        console.log('TEACHERS', response[1])
      }
    });
  }

  getMultipliedAges(): void {
    this.ages
    .pipe(map((age) => age * 2))
    .subscribe({
      next: (res) => {
        //console.log(res)
      }
    })
  }

  getPeopleProfessions(): void {
    this.peopleData
    .pipe(map((people) => people.profession))
    .subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

  getSoftwareDevelopersNames(): void {
    this.peopleData
    .pipe(
      filter((people) => people.profession === 'Back-end Developer'),
      map((people) => people.name)
    )
    .subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

  handleFindStudentsById(): void {
    this.schoolService.getStudents()
    .pipe(
      switchMap((students) => this.findStudentsById(students, this.studentUserId))
    ).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }

  findStudentsById(students: Array<SchoolData>, userId: string) {
    return of([students.find((student) => student.id === userId)]);
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
