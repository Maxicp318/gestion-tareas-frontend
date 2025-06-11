import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../../models/task';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'task-form',
  imports: [FormsModule],
templateUrl: './form.component.html',
})
export class FormComponent {

  @Input() tasks: Task = new Task();

  @Output() addTaskEvent = new EventEmitter();

  onSubmit(taskForm: NgForm) {
    if (taskForm.valid) {
      console.log('Form submitted:', this.tasks);
      this.addTaskEvent.emit(this.tasks);
      taskForm.reset();
      taskForm.resetForm();
    }
  }
}
