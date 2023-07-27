import { get } from "lodash";
import { TaskInterface } from "../interfaces/taskInterface";

export class TaskModel {
  id: number;
  title: string;
  tag: string[];
  list: number;

  constructor(props?: TaskInterface) {
    this.id = get(props, "id", 0);
    this.title = get(props, "title", "");
    this.tag = get(props, "tag", []);
    this.list = get(props, "list", 0);
  }
}
