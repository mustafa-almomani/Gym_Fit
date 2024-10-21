import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../Admin/update-product/services/product.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm!: FormGroup; 
  selectedFile: File | null = null;
  categories: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private http: HttpClient 
  ) { }

 
  getCategories(): void {
    this.productService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  ngOnInit(): void {
  
    this.productForm = this.formBuilder.group({
      categoryId: ['', Validators.required],
      productName: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      stockQuantity: ['', Validators.required],
      image: ['', Validators.required], 
      discount: ['', Validators.required], 
    });

    this.getCategories();
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file; 
    }
  }

  
  onSubmit(): void {
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('stockQuantity', this.productForm.get('stockQuantity')?.value);
      formData.append('discount', this.productForm.get('discount')?.value);

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      this.productService.addProduct(formData).subscribe(
        (response) => {
          console.log('Product added successfully!', response);
          this.router.navigate(['/Dashboard/products']);
        },
        (error) => {
          console.error('Error adding product:', error);
        }
      );
    }
  }
}
