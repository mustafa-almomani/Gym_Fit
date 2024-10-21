import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '.././update-product/services/product.service'; // Make sure this service exists and has the necessary methods

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number; // Store product ID
  imageFile: File | null = null; // For storing selected image file

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id')!; // Fetch product ID from URL
    this.loadProductDetails();

    // Initialize the form with empty values
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      discount: ['', Validators.required],
      image: ['']
    });
  }

  // Load product details from the server
  loadProductDetails(): void {
    this.productService.getProduct(this.productId).subscribe(
      (product) => {
        this.productForm.patchValue({
          productName: product.productName,
          price: product.price,
          description: product.description,
          stockQuantity: product.stockQuantity,
          discount: product.discount,
          image: product.image
        });
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  // Handle file selection for image upload
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
    }
  }

  // Submit the form to update the product
  onSubmit(): void {
    
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('stockQuantity', this.productForm.get('stockQuantity')?.value);
      formData.append('discount', this.productForm.get('discount')?.value);

      if (this.imageFile) {
        formData.append('image', this.imageFile);
      }

      this.productService.updateProduct(this.productId, formData).subscribe(
        () => {
          this.router.navigate(['/Dashboard/products']); // Redirect to products list after successful update
        },
        (error) => {
          console.error('Error updating product:', error);
        }
      );
    }
  
}
