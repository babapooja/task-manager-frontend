import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  errorMessage: string = '';

  ngOnInit(): void {}

  login(email: string, password: string) {
    this.errorMessage = '';
    if (email == '' && password == '') {
      this.errorMessage = 'Enter your username and password';
    } else if (email == '') {
      this.errorMessage = 'Enter your username';
    } else if (password == '') {
      this.errorMessage = 'Enter your password';
    } else {
      this.authService.login(email, password).subscribe(
        (res) => {
          if (res.status === 200) {
            this.route.navigate(['/lists']);
          }
        },
        (err) => {
          this.errorMessage = 'Invalid user!';
        }
      );
    }
  }
}
