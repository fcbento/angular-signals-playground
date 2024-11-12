import { TestBed } from "@angular/core/testing";
import { ExampleTestService } from "./example-test.service";
import { TodoSignalsService } from "./todo-signals.service";
import { Todo } from "../model/todo.model";

describe('ExampleTestService', () =>{
  let service: ExampleTestService;
  let todoService: TodoSignalsService;

  beforeEach(() => {
    service = TestBed.inject(ExampleTestService)
    todoService = TestBed.inject(TodoSignalsService)
  })
  
  it('should return correct list', () => {
    service.getTestNames()
    .subscribe({
      next:(list) => {
        expect(list).toEqual(
          [
            {
              id: 1,
              name: 'Test 1'
            },
            {
              id: 2,
              name: 'Test 2'
            },
          ]
        );
      }
    });
  });

  it('should return correct todo list', () => {
    
    const newTodo: Todo = {
      id: 1,
      description: 'Test creating todo',
      done: true,
      title: 'Test new todo'
    };

    jest.spyOn(todoService, 'updateTodos');
    service.handleCreateTodo(newTodo).subscribe({
      next:(todoList) => {
        expect(todoList).toEqual([newTodo]);
        expect(todoService.updateTodos).toHaveBeenCalledWith(newTodo);
      }
    })

  })

});