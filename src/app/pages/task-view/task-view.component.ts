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
    this.taskService.getList().subscribe((res: any) => {
      this.lists = res;
      if (
        this.lists.length > 0 &&
        (this.currentId == undefined || this.currentId == '')
      ) {
        this.currentId = this.lists[0]['_id'];
        this.fetchTasks();
      }
    });
  }

  fetchTasks() {
    this.taskService.getTasks(this.currentId).subscribe((tasks: any) => {
      this.tasks = tasks;
    });
  }

  onTaskClickListener(task: Task) {
    this.taskService.complete(task).subscribe((res) => {
      task.completed = !task.completed;
    });
  }

  performAction(forWhat: string, action: string, object: any) {
    if (forWhat == 'list') {
      if (action == 'patch') {
        this.router.navigate(['/edit-list', object['_id']]);
      }
      if (action == 'delete') {
        this.taskService.deleteList(object['_id']).subscribe((res) => {
          this.router.navigate(['/lists']);
        });
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
        this.taskService
          .deleteTask(object['_listId'], object['_id'])
          .subscribe((res) => {
            this.tasks = this.tasks.filter(
              (val: any) => val._id !== object['_id']
            );
          });
      }
    }
  }

  logout() {
    this.authService.logout();
  }
}
