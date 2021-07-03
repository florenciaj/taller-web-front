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
    name: new FormControl(''),
    surname: new FormControl(''),
    address: new FormControl(''),
  });

  public validations: any;
  public errorMessage: string = 'Errores';
  public message: any;

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
          Validators.minLength(2)
        ]],
      surname: ['',
        [
          Validators.required,
          Validators.minLength(2)
        ]],
      address: ['',
        [
          Validators.required,
          Validators.minLength(10)
        ]]
    });
  }

  async onRegister() {
    const { email, password, name, surname, address } = this.registerForm.value;
    try {
      const user = await this.authService.register(email, password);

      if (user.message) {
        this.message = user.message;
      } else {
        fetch('http://localhost:5000/api/user', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            name: name,
            surname: surname,
            address: address,
            firebaseId: 123
          })
        }).then(res => res.json())
          .then(res => {
            this.validations = res.errors;
            this.errorMessage = res.message;
          });
        if (user) {
          this.router.navigate(['/validar-email']);
        }
      }

    } catch (error) {
      this.message = error;
    }
  }
}
