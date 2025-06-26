import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from '../../models/task';
import { CommonModule, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'table-task',
  imports: [NgIf, NgFor, CommonModule],
  templateUrl: './task.component.html',
  standalone: true
})
export class TaskComponent implements OnChanges {

  @Input() tasks: Task[] = [];

  @Output() updateTask = new EventEmitter<Task>();
  @Output() removeTask = new EventEmitter<number>();

  title: string = "Listado de tareas";

  cardColors: string[] = [
    'bg-primary',
    'bg-secondary',
    'bg-dark',
    'bg-danger',
    'bg-warning',
    'bg-info'
  ];

  taskColorMap: Map<number, string> = new Map();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tasks'] && this.tasks) {
      this.tasks.forEach(task => {
        if (task.id != null && !this.taskColorMap.has(task.id)) {
          const randomColor = this.cardColors[Math.floor(Math.random() * this.cardColors.length)];
          this.taskColorMap.set(task.id, randomColor);
        }
      });
    }
  }

  onUpdateTask(task: Task): void {
    this.updateTask.emit(task);
  }

  onRemoveTask(id: number): void {
    this.removeTask.emit(id);
  }
}