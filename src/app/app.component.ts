import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Subject, takeUntil, zip } from 'rxjs';

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

  ngOnInit(): void {
    this.getSchoolData();
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
