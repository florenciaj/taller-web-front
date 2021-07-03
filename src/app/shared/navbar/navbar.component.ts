import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CartService } from 'src/app/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [AuthService]
})
export class NavbarComponent implements OnInit {
  public user$: Observable<any> = this.authService.afAuth.user;
  public itemsCount: number = 0

  constructor(private authService: AuthService, private router: Router, private cartService: CartService) {   }

  ngOnInit() {
    this.cartService.currentDataCart$.subscribe(x=>{
      if(x)
      {
        this.itemsCount = x.length;
      }
    })

  }

  async onLogout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/home']);
    } catch (error) {
      console.log(error);
    }
  }

}
