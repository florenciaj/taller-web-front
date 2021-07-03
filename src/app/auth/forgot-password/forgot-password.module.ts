import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorTailorModule } from '@ngneat/error-tailor';


@NgModule({
  declarations: [
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    ForgotPasswordRoutingModule,
    ReactiveFormsModule,
    ErrorTailorModule.forRoot({
      errors: {
        useValue: {
          required: 'Campo requerido',
          minlength: ({ requiredLength, actualLength }) =>
            `Espera ${requiredLength} pero obtuvo ${actualLength}`,
          invalidAddress: error => `Dirección no válida`
        }
      }
    })
  ]
})
export class ForgotPasswordModule { }
