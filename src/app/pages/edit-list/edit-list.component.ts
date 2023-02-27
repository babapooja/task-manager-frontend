import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-list',
  templateUrl: './edit-list.component.html',
  styleUrls: ['./edit-list.component.scss'],
})
export class EditListComponent implements OnInit {
  currentId: string = '';
  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currentId = params['listId'];
    });
  }

  updateList(title: string) {
    this.taskService.updateList(this.currentId, title).subscribe((res) => {
      this.router.navigate(['/lists', this.currentId]);
    });
  }
}
