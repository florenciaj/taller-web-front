export interface ProductResponse {
  lenght: number;
  products: Product[]
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}
