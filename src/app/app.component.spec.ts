import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { first } from 'rxjs';
import { TodoSignalsService } from './services/todo-signals.service';
import { Todo } from './model/todo.model';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalsService: TodoSignalsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        TodoSignalsService,
        provideAnimations()
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalsService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();

  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set @Input() property correctly', () => {
    component.projectName = "Testing Angular With Jest";
    fixture.detectChanges();
    expect(component.projectName).toEqual('Testing Angular With Jest');
  });

  it('should emit event with @Output() decorator correctly', () => {
    component.projectName = "Testing my Angular application";
    component.outputEvent.pipe(
      first()
    ).subscribe({
      next:(event) => {
        expect(event).toEqual('Testing my Angular application');
        component.handleEmit();
      }
    });
  });

  it('should create new todo correctly and call service method', () => {
    jest.spyOn(todoSignalsService, 'updateTodos');
    const newTodo: Todo = {
      id: 1,
      description: 'Test creating todo',
      done: true,
      title: 'Test new todo'
    };
    component.handleCreateTodo(newTodo);
    fixture.detectChanges();
    expect(todoSignalsService.updateTodos).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);
  });

  it('should not render paragraph in the dom', () => {
    const componentDebugElement: DebugElement = fixture.debugElement;
    const element: HTMLElement = componentDebugElement.nativeElement;
    const paragraph = element.querySelector('p');
    expect(paragraph).toBeNull();
  });

  it('should render paragraph in the dom', () => {
    component.renderTestMessage = true
    fixture.detectChanges();
    const componentDebugElement: DebugElement = fixture.debugElement;
    const paragraphDebugElement = componentDebugElement.query(By.css('p'));
    const paragraph: HTMLElement = paragraphDebugElement.nativeElement;
    expect(paragraph.textContent).toEqual('Test your angular app');
  });

  it('should set is done property to be false', () => {
    component.handleCheckIsDone();
    expect(component.isDone).toBe(false);
  });

  it('should set is done property to be true', fakeAsync(() => {
    component.handleCheckIsDone();
    expect(component.isDone).toBe(false);
    tick(200);

    expect(component.isDone).toBe(true);
  }));
  
});
