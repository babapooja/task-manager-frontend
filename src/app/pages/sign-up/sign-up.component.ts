import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup(email: string, password: string) {
    this.isLoading = true;
    this.authService.signup(email, password).subscribe(
      (res) => {
        this.isLoading = false;
        this.router.navigateByUrl('/lists');
      },
      (err) => {
        this.isLoading = false;
      }
    );
  }
}
