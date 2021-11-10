import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "../../service/token-storage.service";
import {DataTransferService} from "../../service/data-transfer.service";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";
import {Todo} from "../../model/todo";
import {TodoService} from "../../service/todo.service";
import {Response} from "../../model/response";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isTodoCreateStatus: boolean = true;
  todo: Todo = <Todo>{};
  response: Response = {};
  todoList: Array<Todo> = [];
  deleteTodoItems: Array<number> = [];
  isDeleteTodoDisabled = true;


  constructor(private tokenStorageService: TokenStorageService, private dataTransfer: DataTransferService, private router: Router, private auth: AuthService, private todoService: TodoService) {
    this.dataTransfer.currentIsTodoStatus.subscribe(result => {
      this.isTodoCreateStatus = result;
    });

    this.dataTransfer.currentTodoData.subscribe(data => {
      this.todo = data;
    });

    this.dataTransfer.currentDeleteTodoData.subscribe(data => {
      this.deleteTodoItems = data;
    })
    if(this.deleteTodoItems.length != 0){
      this.isDeleteTodoDisabled = false;
    }
  }

  ngOnInit(): void {
  }

  logout(): void {
    //this.auth.logout();
    this.tokenStorageService.signOut();
    window.location.reload();
    this.dataTransfer.changeLoginStatus(true);
    this.router.navigate(['/login']);

  }

  createTodo() {
    console.log('create todo', this.todo)
    this.todoService.createTodo(this.todo).subscribe(response => {
      this.response = response;
    });
    //this.getTodoListById(this.todo.listId);
    setTimeout(() => {
      this.todoService.getTodoList(this.todo.listId).subscribe(data => {
        this.todoList = data;
        console.log('DATA TRANSFER', this.todoList);
      })
      console.log('DATA TRANSFER 0', this.todoList);

    }, 300);

    setTimeout(()=>{
      this.dataTransfer.changeTodoListData(this.todoList);

    },500);
  }

  getTodoListById(id: number) {
    this.todoService.getTodoList(id).subscribe(data => {
      this.todoList = data;
      console.log('DATA TRANSFER', this.todoList);
    })
    this.dataTransfer.changeTodoListData(this.todoList);
  }

  deleteTodo() {
    this.todoService.deleteTodoList(this.deleteTodoItems).subscribe(response => {
      this.response = response;
    });



  }

}
