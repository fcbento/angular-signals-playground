import { inject, Inject, Injectable } from "@angular/core";
import { TodoSignalsService } from "./todo-signals.service";
import { Observable, of } from "rxjs";
import { Todo } from "../model/todo.model";

@Injectable({providedIn: 'root'})
export class ExampleTestService {
  public testNameList: Array<{id: number, name: string}> = [
    {
      id: 1,
      name: 'Test 1'
    },
    {
      id: 2,
      name: 'Test 2'
    },
  ]
  private todoSignal = inject(TodoSignalsService);

  public getTestNames(): Observable<Array<{id: number, name: string}>> {
    return of(this.testNameList);
  }

  public handleCreateTodo(todo: Todo): Observable<Array<Todo>> {
    this.todoSignal.updateTodos(todo);
    return of(this.todoSignal.todoState());
  }

}