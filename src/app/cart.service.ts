import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Product } from './product';
import { CartItem } from './cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart = new BehaviorSubject<Array<CartItem>>(new Array()); 
  public currentDataCart$ = this.cart.asObservable();

  constructor() {
    var cartOnCache = localStorage.getItem('cart');
    var cartProduct: CartItem[] = cartOnCache ? JSON.parse(cartOnCache) : [];
    this.cart.next(cartProduct);
  }

  addToCart(product: Product) {
    let listCart = this.cart.getValue();

    if (listCart.length != 0) {
      let productIndex = listCart.findIndex(
        (item) => item.product._id == product._id
      );
      console.log(JSON.stringify(product._id));
      if (productIndex != -1) 
        listCart[productIndex].quantity += 1;
      else {
        var newItem: CartItem = { product: product, quantity: 1 };
        listCart.push(newItem);
        console.log(JSON.stringify(listCart));
      }
    } else {
      listCart = [];
      var newItem: CartItem = { product: product, quantity: 1 };
      listCart.push(newItem);
    }

    this.cart.next(listCart);

    localStorage.setItem('cart', JSON.stringify(listCart));
  }

  public removeFromCart(product: Product) {
    let listCart = this.cart.getValue();

    if (listCart) {
      let productIndex = listCart.findIndex(
        (item) => item.product._id == product._id
      );

      if (productIndex != -1) {
        listCart[productIndex].quantity -= 1;
        if (listCart[productIndex].quantity == 0)
          listCart.splice(productIndex, 1);
      }
    }

    this.cart.next(listCart);
    localStorage.setItem('cart', JSON.stringify(listCart));
  }

  public clearCart() {
    this.cart.next([]);
    localStorage.clear();
  }
}
