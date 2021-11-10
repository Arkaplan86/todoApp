import {Component, OnInit} from '@angular/core';
import {UserService} from "../../service/user.service";
import {DataTransferService} from "../../service/data-transfer.service";
import {User} from "../../model/user";
import {TodoService} from "../../service/todo.service";
import {Todo} from "../../model/todo";
import {ListService} from "../../service/list.service";
import {List} from "../../model/list";
import {Response} from "../../model/response";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = <User>{};
  todoList: Array<Todo> = [];
  dayTodoList: Array<Todo> = [];
  weekTodoList: Array<Todo> = [];
  list: Array<List> = [];
  deleteTodoList: Array<Todo> = [];
  todo: Todo = <Todo>{};
  clist: List = <List>{};
  text: string = '';
  isActive = true;
  isDeleteActive = true;
  response: Response = {};
  selectedListId: number | undefined = 0;
  selected = false;
  allComplete: boolean = false;
  deleteItemList: Array<number> = [];
  deleteTodoItemList: Array<number> = [];
  todoText: string = '';
  isTodoCreate: boolean = true;


  constructor(private dataTransfer: DataTransferService, private userService: UserService, private todoService: TodoService, private listService: ListService) {
    this.dataTransfer.currentTodoDataList.subscribe(data=> {
      console.log('currenct todo data', data);
     // this.todoList = [];
      this.todoList = data;
      if(this.todoList.length != 0){
        this.todoText ='';
      }
    });
  }

  ngOnInit(): void {
    this.getAuthUserInfo();
    this.getUserTodoList();
   /* this.dataTransfer.currentTodoDataList.subscribe(data=> {
      console.log('current data ngoninit',data);
      this.todoList = data;
      this.todoText = '';
    }) */
  }

  getAuthUserInfo() {
    this.userService.getAuthUser().subscribe(data => {
      this.user = data;
      console.log(data);
    })
  }

  getUserTodoList() {
    this.listService.getList().subscribe(data => {
      this.list = data;
      console.log('user todo', this.list)
    });
    this.todoService.getWeekTodo().subscribe(data => {
      this.weekTodoList = data;
    });
    this.todoService.getDayTodo().subscribe(data => {
      this.todoList = data;
      this.dayTodoList = data;
    })
  }

  getTodayTodo() {
    this.todoService.getDayTodo().subscribe(data => {
      this.todoList = data;
      this.isDeleteActive = true;
    })
  }

  getWeekTodoList() {
    this.todoService.getWeekTodo().subscribe(data => {
      this.todoList = data;
      this.isDeleteActive = true;
    });
  }

  getListTodo(id: number) {
    this.todoService.getTodoList(id).subscribe(data => {
      this.todoList = data;
      this.isDeleteActive = false;
      this.selectedListId = id;
      this.todo.listId = id;
      console.log('selected id', this.selectedListId);
    })
  }

  createList() {
    this.clist.description = this.text;
    this.listService.createList(this.clist).subscribe(data => {
      this.response = data;
      console.log('response', this.response);
    });
    setTimeout(() => {
      this.getList();
    }, 500);
  }

  deleteList() {
    this.listService.deleteList(this.deleteItemList).subscribe(data => {
      console.log(data);
    })
    setTimeout(() => {
      this.getList();
    }, 500);
  }

  getList() {
    this.listService.getList().subscribe(data => {
      this.list = data;
    })
  }

  activateButton() {
    if (this.text !== '') {
      this.isActive = false;
      console.log("1", this.isActive);
      console.log('text', this.text)
    } else {
      this.isActive = true;
      console.log("2", this.isActive);
    }
  }

  activateTodoButton() {
    if (this.todoText !== '') {
      this.dataTransfer.changeIsTodoStatus(false);
      this.todo.description = this.todoText;
      this.dataTransfer.changeTodoData(this.todo);
      console.log("1", this.isActive);
      console.log('todotext', this.todoText)
    } else {
      this.dataTransfer.changeIsTodoStatus(true);

      console.log("2", this.isActive);
    }
  }

  selectedItem(event: Event) {
    console.log('event here')
    console.log('event', event);
  }

  updateAllComplete() {
    this.allComplete = this.list != null && this.list.every(t => t.checked);
    this.deleteItemList = [];
    for (let item of this.list) {
      if (item.checked && item.id != null) {
        this.deleteItemList.push(item.id)
      }
    }
  }

  deleteTodoAllComplete() {
    this.todoList != null && this.todoList.every(t => t.checked);
    this.deleteTodoItemList = [];
    for (let item of this.todoList) {
      if (item.checked && item.id != null) {
        this.deleteTodoItemList.push(item.id)
      }
    }
    this.dataTransfer.deleteTodoListData(this.deleteTodoItemList);
    console.log(this.deleteTodoItemList)
  }
}
