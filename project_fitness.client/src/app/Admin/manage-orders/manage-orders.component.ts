import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from './order-service.service'; // Assuming you have a service to manage orders
import { Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Define the Order interface
interface Order {
  id: number; // Ensure that id is always a number
  customerName: string;
  quantity: number;
  totalAmount: number;
  status: string;
}
declare var bootstrap: any;

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {
  orders: Order[] = []; // Ensure the orders array is typed
  selectedOrder: any = null;
  orderForm: FormGroup;

  isEditMode = false; // Track whether we're editing or adding a new order
  currentOrderId: number | null = null; // Track the ID of the order we're editing

  constructor(private fb: FormBuilder, private orderService: OrderService, private router: Router) {
    // Initialize the form group
    this.orderForm = this.fb.group({
      customerName: ['', Validators.required],
      product: ['', Validators.required],
      quantity: [0, Validators.required],
      totalAmount: [0, Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  // Load all orders
  loadOrders(): void {
    this.orderService.getOrders().subscribe((data: Order[]) => {
      this.orders = data;
    });
  }

  // Add or update an order
  onSubmit(): void {
    const orderData = this.orderForm.value;
    if (this.isEditMode && this.currentOrderId) {
      // Update existing order
      this.orderService.updateOrder(this.currentOrderId).subscribe(() => {
        this.loadOrders();
        this.resetForm();
      });
    } else {
      // Add new order
      this.orderService.addOrder(orderData).subscribe(() => {
        this.loadOrders();
        this.resetForm();
      });
    }
  }

  // Edit an order
  editOrder(id: any): void {
    this.isEditMode = true;
    this.currentOrderId = id; // Make sure to set the current order ID

    this.orderService.updateOrder(id).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'The order has been updated successfully.',
        confirmButtonText: 'OK'
      });
      this.loadOrders(); // Reload the updated orders
      this.router.navigate(["/Dashboard/manage-orders"]); // Navigate to the manage orders page
    });
  }

  // Delete an order
  //deleteOrder(id: number): void {
  //  if (id) {
  //    this.orderService.deleteOrder(id).subscribe(() => {
  //      this.loadOrders();
  //    });
  //  }
  //}
  showInfo(id:any): void {
    this.getoderByID(id);
   
  }
  getoderByID(id: any) {

    this.orderService.getoderByID(id).subscribe((data: any) => {
      this.selectedOrder = data
      const modalElement = document.getElementById('orderModal');
      const modalInstance = new bootstrap.Modal(modalElement);
      modalInstance.show(); // Show the modal
    })
  }
  // Reset form after adding/updating order
  resetForm(): void {
    this.isEditMode = false;
    this.currentOrderId = null;
    this.orderForm.reset({
      customerName: '',
      product: '',
      quantity: 0,
      totalAmount: 0,
      status: 'Pending'
    });
  }
}
