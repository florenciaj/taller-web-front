import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { CartService } from '../cart.service';
import { CartItem } from '../cartItem';
import { CheckoutService } from '../checkout.service';
import { Invoice } from '../invoice';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [AuthService],
})
export class CheckoutComponent implements OnInit {
  checkoutForm = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    address: new FormControl(''),
    cardName: new FormControl(''),
    cardNumber: new FormControl(''),
    cardSecurityCode: new FormControl(''),
    cardExpiration: new FormControl(''),
  });

  public items: Array<CartItem> = [];
  public totalPrice: number = 0;
  public totalQuantity: number = 0;

  public validations: any;
  public message: any;
  public messageError: any;
  public user$: Observable<any> = this.authService.afAuth.user;

  constructor(
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<any> {
    const user = await this.authService.getCurrentUser();
    if (user == null || !user.emailVerified) {
      this.router.navigate(['/login']);
    }

    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      cardName: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(25),
        ],
      ],
      cardNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(16),
          Validators.maxLength(16),
        ],
      ],
      cardSecurityCode: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(3)],
      ],
      cardExpiration: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(5)],
      ],
    });

    this.cartService.currentDataCart$.subscribe((x) => {
      if (x) {
        this.items = x;
        this.totalQuantity = x.length;
        this.totalPrice = x.reduce(
          (sum, current) => sum + current.product.price * current.quantity,
          0
        );
      }
    });
  }

  async onSubmit() {
    const {
      name,
      surname,
      address,
      cardName,
      cardNumber,
      cardSecurityCode,
      cardExpiration,
    } = this.checkoutForm.value;
    try {
      var invoice: Invoice = {
        buyer: {
          name: name,
          surname: surname,
          address: address,
        },
        cardName: cardName,
        cardNumber: Number(cardNumber),
        cardSecurityCode: Number(cardSecurityCode),
        cardExpiration: cardExpiration,
        products: this.items,
      };

      const response = await this.checkoutService.submitCheckout(invoice);
      this.message = response.message;

      var resetForm = <HTMLFormElement>document.getElementById('form');
      resetForm.reset();

      this.cartService.clearCart();
    } catch (error) {
      this.messageError =
        'No fue posible confirmar la compra. Por favor reintente más tarde.';
    }
  }
}
