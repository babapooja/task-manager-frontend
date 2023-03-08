import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss'],
})
export class TaskViewComponent implements OnInit {
  lists: any;
  currentId: string;
  tasks: any;
  isLoading: boolean = false;

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    this.currentId = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentId = params['listId'];
      if (this.currentId !== undefined) {
        this.fetchTasks();
      }
    });
    this.fetchLists();
  }

  fetchLists() {
    this.isLoading = true;
    this.taskService.getList().subscribe(
      (res: any) => {
        this.lists = res;
        this.isLoading = false;
        if (
          this.lists.length > 0 &&
          (this.currentId == undefined || this.currentId == '')
        ) {
          this.currentId = this.lists[0]['_id'];
          this.fetchTasks();
        }
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  fetchTasks() {
    this.isLoading = true;
    this.taskService.getTasks(this.currentId).subscribe(
      (tasks: any) => {
        this.isLoading = false;
        this.tasks = tasks;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  onTaskClickListener(task: Task) {
    this.isLoading = true;
    this.taskService.complete(task).subscribe(
      (res) => {
        this.isLoading = false;
        task.completed = !task.completed;
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }

  performAction(forWhat: string, action: string, object: any) {
    if (forWhat == 'list') {
      if (action == 'patch') {
        this.router.navigate(['/edit-list', object['_id']]);
      }
      if (action == 'delete') {
        this.isLoading = true;
        this.taskService.deleteList(object['_id']).subscribe(
          (res) => {
            this.router.navigate(['/lists']);
          },
          (err) => {
            this.isLoading = false;
          }
        );
      }
    }
    if (forWhat == 'task') {
      if (action == 'patch') {
        // lists/:listId/edit-task/:taskId
        this.router.navigate([
          '/lists',
          object['_listId'],
          'edit-task',
          object['_id'],
        ]);
      }
      if (action == 'delete') {
        // lists/:listId/edit-task/:taskId
        this.isLoading = true;
        this.taskService.deleteTask(object['_listId'], object['_id']).subscribe(
          (res) => {
            this.isLoading = false;
            this.tasks = this.tasks.filter(
              (val: any) => val._id !== object['_id']
            );
          },
          (err) => {
            this.isLoading = false;
          }
        );
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
