import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'table-task',
  imports: [],
  templateUrl: './task.component.html',
})
export class TaskComponent {
  title: string = "Listado de tareas";

  @Input() tasks: Task[] = [];

  @Output() updateTask = new EventEmitter();

  @Output() removeTask = new EventEmitter();

  onUpdateTask(task: Task): void {
    this.updateTask.emit(task);
  }

  onRemoveTask(id: number): void {
    this.removeTask.emit(id);
  }
}
