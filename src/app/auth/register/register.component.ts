import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [AuthService]
})

export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.email
        ]],
      password: ['',
        [
          Validators.required,
          Validators.minLength(6)
        ]],
      name: ['',
        [
          Validators.required,
        ]],
      surname: ['',
        [
          Validators.required,
        ]],
      address: ['',
        [
          Validators.required,
        ]]
    });
  }

  async onRegister() {
    const { email, password } = this.registerForm.value;
    try {
      const user = await this.authService.register(email, password);
      if (user) {
        this.router.navigate(['/validar-email']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
