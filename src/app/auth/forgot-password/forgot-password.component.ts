import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [AuthService]
})
export class ForgotPasswordComponent implements OnInit {
  userEmail = new FormControl('');

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  async onReset(): Promise<void> {
    try {
      const email: string = this.userEmail.value;
      await this.authService.resetPassword(email);
      window.alert('enviado');
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
