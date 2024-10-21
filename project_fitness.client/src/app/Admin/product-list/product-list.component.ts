import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../Admin/update-product/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.fetchProducts(); 
  }

  fetchProducts(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  editProduct(id: number | undefined): void {
    if (id === undefined || id === null) {
      console.error('Invalid product ID.');
      return;
    }

    // Navigate to the edit product page, assuming the route is set up properly
    this.router.navigate([`/editproduct/${id}`]);
  }

  deleteProduct(id: number | undefined): void {
    if (id === undefined || id === null) {
      console.error('Invalid product ID.');
      return;
    }

    if (confirm(`Are you sure you want to delete the product with ID: ${id}?`)) {
      this.productService.deleteProduct(id).subscribe(() => {
        console.log(`Product with id ${id} deleted`);

        // Refresh the product list after deletion
        this.fetchProducts();
      }, (error) => {
        console.error('Error deleting product:', error);
      });
    }
  }


    }
  
