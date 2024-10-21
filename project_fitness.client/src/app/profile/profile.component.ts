import { Component, OnInit } from '@angular/core';
import { URLService } from '../url/url.service';
import { Router } from '@angular/router';

declare var window: any; // للتعامل مع الجافا سكريبت لفتح الموديل

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  UserArray: any;
  userId: any;
  testimonial: string = '';
  selectedOrder: any = null; // متغير لتخزين الطلب المحدد لعرض تفاصيله

  constructor(private userService: URLService, private router: Router) { }

  ngOnInit(): void {
    this.userService.UserIdmm.subscribe(user => {
      this.userId = user,
        console.log(this.userId);
    });
    this.loadUserData();
  }
  loadUserData() {
    this.userService.GetUserID(this.userId).subscribe(data => {
      this.UserArray = data;
      console.log(this.UserArray);
      this.UserArray.orderItems = this.flattenOrderItems(data.orders);
    });
  }

  private flattenOrderItems(orders: any[]): any[] {
    return orders.reduce((acc, order) => {
      return acc.concat(order.orderItems);
    }, []);
  }

  submitTestimonial() {
    if (this.testimonial.trim()) {
      this.userService.addTestimonial(this.userId, this.testimonial).subscribe();
      console.log('Testimonial submitted:', this.testimonial);
      this.testimonial = '';
    } else {
      alert('Please enter a testimonial');
    }
  }

  // دالة لفتح الموديل وعرض تفاصيل الطلب
  showOrderDetails(order: any) {
    this.selectedOrder = order;
    const modalElement = document.getElementById('orderDetailsModal');
    if (modalElement) {
      const modal = new window.bootstrap.Modal(modalElement);
      modal.show();
    }
  }
}
