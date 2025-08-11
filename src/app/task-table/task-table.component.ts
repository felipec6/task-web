import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-task-table',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss']
})
export class TaskTableComponent implements OnInit {
  successMessage: string | null = null;
  tasks: Task[] = [];
  statuses: string[] = [];
  projects: Project[] = [];
  page = 0;
  size = 10;
  totalElements = 0;
  projectIdFilter?: number;

  showOptionsIndex: number | null = null;

  taskForm!: FormGroup;

  private modalRef?: NgbModalRef;

  constructor(private taskService: TaskService, private projectService: ProjectService, private modalService: NgbModal, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadTasks();
    this.loadStatuses();
    this.loadProjects();
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      project: [null, Validators.required]
    });
  }

  loadTasks(): void {
    this.taskService.getTasks(this.page, this.size, this.projectIdFilter).subscribe({
      next: (response) => {
        this.tasks = response.content;
        this.totalElements = response.totalElements;
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas', error);
      }
    });
  }

  loadStatuses(): void {
    this.taskService.getStatuses().subscribe({
      next: (response) => {
        this.statuses = response;
      },
      error: (error) => {
        console.error('Erro ao carregar os status', error);
      }
    });
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (response) => {
        this.projects = response;
      },
      error: (error) => {
        console.error('Erro ao carregar os projetos', error);
      }
    });
  }

  previousPage() {
    if(this.page > 0) {
      this.page--;
      this.loadTasks();
    }
  }

  nextPage() {
    this.page++;
    this.loadTasks();
  }

  toggleOptions(index: number) {
    this.showOptionsIndex = this.showOptionsIndex === index ? null : index;
  }

  deleteTask(id: number): void {
  this.taskService.deleteTask(id).subscribe({
    next: () => {
      this.loadTasks();
      this.successMessage = 'Tarefa removida com sucesso!';
        setTimeout(() => this.successMessage = null, 3000);
    },
    error: (error) => {
      console.error('Erro ao deletar tarefa:', error);
    }
  });
}

  openCreateModal(content: any) {
    this.taskForm.reset();
    this.modalService.open(content, { centered: true });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      this.taskService.createTask({
        id: null,
        title: formValue.title,
        description: formValue.description,
        status: formValue.status,
        creationDate: new Date().toISOString().slice(0, 10),
        projectId: formValue.project
      }).subscribe({
        next: () => {
        this.modalRef?.close();
        this.modalService.dismissAll();
        this.successMessage = 'Dados salvos com sucesso!';
        setTimeout(() => this.successMessage = null, 3000);
      }
      });
    }
  }
}
