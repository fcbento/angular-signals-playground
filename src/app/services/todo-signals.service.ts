import { Injectable, signal } from '@angular/core';
import { Todo } from '../model/todo.model';
import { TodoKeyLocalStorage } from '../enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root',
})
export class TodoSignalsService {
  public todoState = signal<Array<Todo>>([]);

  public updateTodos({ id, title, description, done }: Todo): void {
    if ((title && id && description) || undefined) {
      this.todoState.update((todos) => {
        if (todos) {
          todos.push(new Todo(id, title, description, done));
          return todos;
        }
        return todos;
      });
      this.saveTodosInLocalStorage();
    }
  }

  public saveTodosInLocalStorage(): void {
    const todos = JSON.stringify(this.todoState());
    todos && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos);
  }
}
