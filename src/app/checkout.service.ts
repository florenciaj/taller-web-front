import { Injectable } from '@angular/core';
import { Invoice } from './invoice';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor() { }

  async submitCheckout(invoice: Invoice) {
    var response = fetch('http://localhost:8000/api/bill', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(invoice)
        }).then(res => {
          if (!res.ok) throw Error();
          return res.json()
        })

    return response
  }

}