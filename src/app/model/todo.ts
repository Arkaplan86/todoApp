import {SubItem} from "./sub-item";

export class Todo {
  id: number;
  description: string;
  createDate: Date;
  deadLine: Date;
  listId: number;
  items: Array<SubItem> = [];
  checked: boolean;

  constructor(id: number, description: string, createDate: Date, deadLine: Date, listId: number, items: Array<SubItem>, checked: boolean) {
    this.id = id;
    this.description = description;
    this.createDate = createDate;
    this.deadLine = deadLine;
    this.listId = listId;
    this.items = items;
    this.checked = checked;
  }


}
