import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { OrderService } from '../manage-orders/order-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrl: './order-item.component.css'
})

export class OrderItemComponent {
  selectedOrder: any
  productId:any
  constructor(private fb: FormBuilder, private orderService: OrderService, private router: Router, private route: ActivatedRoute,) { }
  ngOnInit() {
    debugger
    this.productId = +this.route.snapshot.paramMap.get('id')!;
    this.getoderByID(this.productId);
}
  getoderByID(id: any) {
   
    this.orderService.getoderByID(id).subscribe((data: any) => {
      this.selectedOrder = data
      console.log(data)
     
    })
  }
}
