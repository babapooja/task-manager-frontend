import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit {
  listID = '';
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.listID = params['listId'];
    });
  }

  createTask(title: string) {
    this.taskService.createTask(title, this.listID).subscribe((res: any) => {
      // navigate back to /lists/:listId
      this.router.navigateByUrl(`lists/${res._listId}`);
    });
  }
}
