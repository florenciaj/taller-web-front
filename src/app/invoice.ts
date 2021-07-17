import { CartItem } from "./cartItem";

export interface Invoice{
    buyer: Object,
    cardName: string,
    cardNumber: number,
    cardSecurityCode: number,
    cardExpiration: string,
    products: Array<CartItem> 
}