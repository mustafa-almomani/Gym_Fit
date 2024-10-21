import { Component, Input } from '@angular/core';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  // Product input
  @Input() product!: {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    description: string;
  };

  constructor(private cartService: CartService) { }

  addToCart(): void {
    const cartItem = {
      productId: this.product.id,
      quantity: 1,
      price: this.product.price
    };

    this.cartService.addToCart(1, cartItem).subscribe(
      () => {
        Swal.fire('Success', `1 unit of ${this.product.name} added to cart!`, 'success');
      },
      (error: any) => {
        Swal.fire('Error', 'Error adding product to cart.', 'error');
        console.error('Error adding product to cart:', error);
      }
    );
  }

  
}
