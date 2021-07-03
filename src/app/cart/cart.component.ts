import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { CartItem } from '../cartItem';
import { Product } from '../product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public items: Array<CartItem> = [];
  public totalPrice:number = 0;
  public totalQuantity:number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.currentDataCart$.subscribe(x=>{
      if(x)
      {
        this.items = x;
        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.product.price * current.quantity), 0);
      
      }
    })
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product)
  }

}
