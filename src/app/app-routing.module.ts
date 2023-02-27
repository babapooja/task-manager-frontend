import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditListComponent } from './pages/edit-list/edit-list.component';
import { EditTaskComponent } from './pages/edit-task/edit-task.component';
import { LoginComponent } from './pages/login/login.component';
import { NewListComponent } from './pages/new-list/new-list.component';
import { NewTaskComponent } from './pages/new-task/new-task.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TaskViewComponent } from './pages/task-view/task-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lists',
  },
  {
    path: 'new-list',
    component: NewListComponent,
  },
  {
    path: 'lists/:listId',
    component: TaskViewComponent,
  },
  {
    path: 'lists',
    component: TaskViewComponent,
  },
  {
    path: 'edit-list/:listId',
    component: EditListComponent,
  },
  {
    path: 'lists/:listId/edit-task/:taskId',
    component: EditTaskComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'lists/:listId/new-task',
    component: NewTaskComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
