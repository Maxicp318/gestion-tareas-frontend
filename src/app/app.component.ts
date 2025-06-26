import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Task } from './models/task';
import { TaskComponent } from './components/task/task.component';
import { TaskService } from './services/task.service';
import Swal from 'sweetalert2';
import { FormComponent } from "./components/form/form.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [TaskComponent, FormComponent, CommonModule],
})
export class AppComponent implements OnInit {
  title: string = 'Gestion de Tareas';
  tasks: Task[] = [];
  taskSelected: Task = new Task();

  constructor(private service: TaskService) {}

  ngOnInit(): void {
    this.service.findAllTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  addTask(task: Task): void {
    if (task.id > 0) {
      this.service.updateTask(task).subscribe((taskUpdate) => {
        this.tasks = this.tasks.map((t) => {
          if (t.id == task.id) {
            return { ...taskUpdate };
          }
          return t;
        });
        Swal.fire({
          title: 'Tarea actualizada!',
          text: `Tarea ${taskUpdate.name} actualizada con exito!`,
          icon: 'success',
        });
      });
    } else {
      this.service.createTask(task).subscribe((taskNew) => {
        this.tasks = [...this.tasks, { ...taskNew }];
        Swal.fire({
          title: 'Tarea creada!',
          text: `Tarea ${taskNew.name} creada con exito!`,
          icon: 'success',
        });
      });
    }
  }

  onUpdateTask(task: Task): void {
    this.taskSelected = { ...task };
  }

  onRemoveTask(id: number): void {
    Swal.fire({
      title: 'Seguro que deseas eliminar?',
      text: "Cuidado se eliminara la tarea del sistema!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.removeTask(id).subscribe((taskDelete) => {
          this.tasks = this.tasks.filter((t) => t.id != id);
          Swal.fire({
            title: 'Eliminado!',
            text: `Tarea ${taskDelete.name} eliminado con exito!`,
            icon: 'success',
          });
        })
      }
    });
  }
}
