import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnDestroy, OnInit, Output, WritableSignal } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { filter, from, map, of, Subject, switchMap, takeUntil, zip } from 'rxjs';
import { TodoSignalsService } from './services/todo-signals.service';
import { Todo } from './model/todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'todo-list-16';
  @Input() public projectName!: string;
  @Output() public outputEvent = new EventEmitter<string>();
  public todoSignal!: WritableSignal<Todo[]>;
  public renderTestMessage = false;
  public isDone = false;

  private readonly schoolService = inject(SchoolService);
  private readonly todoSignalService = inject(TodoSignalsService);

  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];

  private readonly zipSchoolResponses$ = zip(
    this.schoolService.getStudents(),
    this.schoolService.getTeachers()
  );

  private readonly destroy$: Subject<void> = new Subject();

  private readonly ages = of(20, 30, 40, 50, 60, 70);
  private readonly peopleData = from([
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

  private readonly studentUserId = '2';

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

  handleEmit() {
    this.outputEvent.emit(this.projectName);
  }
  
  public handleCreateTodo(todo: Todo): void {
    if(todo) {
      this.todoSignalService.updateTodos(todo);
      this.todoSignal = this.todoSignalService.todoState;
    }
  }

  public handleCheckIsDone() {
    setTimeout(() => {
      this.isDone = true
    }, 200)
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
