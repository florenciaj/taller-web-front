import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SendEmailComponent } from './auth/send-email/send-email.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'productos', component: ProductsComponent },
  { path: 'login', loadChildren: () => import('./auth/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterModule) },
  { path: 'validar-email', component: SendEmailComponent},
  { path: 'recuperar-cuenta', loadChildren: () => import('./auth/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule) },
  { path: 'cart', component: CartComponent},
  { path: 'checkout', component: CheckoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
