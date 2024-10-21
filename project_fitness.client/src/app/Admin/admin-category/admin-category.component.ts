import { Component, OnInit } from '@angular/core';
import { CategoryService } from './category.service';
import { Route, Router } from '@angular/router';

// Define the Category interface
interface Category {
  id?: number;
  categoryName: string;
  description: string;
  image?: string;
}

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  categories: Category[] = [];
  newCategory: string = ''; // Ensure this property is declared
  description: string = ''; // Ensure this property is declared
  imageFile: File | null = null;  // For storing the selected image file

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories(); // Fetch categories on component initialization
  }

  // Fetch all categories
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: Category[]) => {
        this.categories = data;
      },
      (error) => {
        console.error('Error fetching categories:', error);
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

  // Add a new category
  addCategory(): void {
    if (!this.newCategory || !this.description) {
      console.error('Category name and description are required.');
      return;
    }

    const formData = new FormData();
    formData.append('CategoryName', this.newCategory); // Category name
    formData.append('Description', this.description);  // Category description
    if (this.imageFile) {
      formData.append('ImageFile', this.imageFile); // Append the selected image file
    }

    this.categoryService.addCategory(formData).subscribe(
      () => {
        this.getCategories();  // Reload categories after adding
        this.resetForm();      // Reset the form after success
      },
      (error) => {
        console.error('Error adding category:', error);
      }
    );
  }

  // Delete a category by ID
  deleteCategory(id: number): void {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe(
        () => {
          this.getCategories();  // Reload categories after deletion
        },
        (error) => {
          console.error('Error deleting category:', error);
        }
      );
    }
  }

  EditCategory(id: any) {
    this.router.navigate([`/EditCategory/${id}`])
  }

  // Clear the form inputs
  resetForm(): void {
    this.newCategory = '';
    this.description = '';
    this.imageFile = null;
  }
}
