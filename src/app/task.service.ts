import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor(private webRequestService: WebRequestService) {}

  getList() {
    return this.webRequestService.get('lists');
  }

  createList(title: string) {
    return this.webRequestService.post('lists', { title });
  }

  updateList(id: string, title: string) {
    return this.webRequestService.patch(`lists/${id}`, { title });
  }

  // TASK RELATED FUNCTIONS
  getTasks(listId: string) {
    return this.webRequestService.get(`lists/${listId}/tasks`);
  }

  createTask(title: string, listId: string) {
    return this.webRequestService.post(`lists/${listId}/tasks`, {
      title: title,
      _listId: listId,
    });
  }

  updateTask(title: string, listId: string, taskId: string) {
    return this.webRequestService.patch(`lists/${listId}/tasks/${taskId}`, {
      title: title,
      _listId: listId,
    });
  }
  deleteTask(listId: string, taskId: string) {
    return this.webRequestService.delete(`lists/${listId}/tasks/${taskId}`);
  }

  complete(task: Task) {
    return this.webRequestService.patch(
      `lists/${task._listId}/tasks/${task._id}`,
      {
        completed: !task.completed,
      }
    );
  }

  deleteList(id: string) {
    return this.webRequestService.delete(`lists/${id}`);
  }
}
