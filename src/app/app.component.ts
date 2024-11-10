import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { from, map, of, Subject, takeUntil, zip } from 'rxjs';

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
  ]);

  ngOnInit(): void {
    this.getSchoolData();
    this.getMultipliedAges();
    this.getPeopleProfessions();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
