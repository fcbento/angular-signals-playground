import { Component, computed, inject } from '@angular/core';
import { TodoKeyLocalStorage } from '../../enum/todoKeyLocalStorage';
import { Todo } from '../../model/todo.model';
import { TodoSignalsService } from '../../services/todo-signals.service';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { CustomUpperCasePipe } from '../../shared/pipes/customUpperCase.pipe';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CustomUpperCasePipe
  ],
  templateUrl: './todo-card.component.html'
})
export class TodoCardComponent {
  
  private todoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.todoSignalsService.todoState;
  public todosList = computed(() => this.todosSignal());

  public ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  private getTodosInLocalStorage(): void {
    const todosDatas = localStorage.getItem(
      TodoKeyLocalStorage.TODO_LIST
    ) as string;
    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodosInLocalStorage(): void {
    this.todoSignalsService.saveTodosInLocalStorage();
  }

  public handleDoneTodo(todoId: number): void {
    if (todoId) {
      this.todosSignal.update((todos: Todo[]) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true);
        return todos;
      });
    }
  }

  public handleDeleteTodo(todo: Todo): void {
    if (todo) {
      const index = this.todosList().indexOf(todo);

      if (index !== -1) {
        this.todosSignal.update((todos: Todo[]) => {
          todos.splice(index, 1);
          this.saveTodosInLocalStorage();
          return todos;
        });
      }
    }
  }
}
