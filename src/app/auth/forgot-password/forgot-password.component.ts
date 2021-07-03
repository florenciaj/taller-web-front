import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [AuthService]
})
export class ForgotPasswordComponent implements OnInit {
  passwordForm = new FormGroup({
    userEmail: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group({
      userEmail: ['',
        [
          Validators.required,
          Validators.email
        ]],
    });
  }

  async onReset(): Promise<void> {
    try {
      const email: string = this.passwordForm.value["userEmail"];
      await this.authService.resetPassword(email);
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }
}
