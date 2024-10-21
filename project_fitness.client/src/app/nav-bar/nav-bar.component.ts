import { Component } from '@angular/core';
import { CartService } from '../Rahaf/cart.service';
import { Router } from '@angular/router';
import { ProductDetailsService } from '../Rahaf/product-details.service';
import { URLService } from '../url/url.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  onCloseClick(event: Event): void {
    event.preventDefault();
  }
  constructor(private cartService: CartService, private router: Router, private ProductService: ProductDetailsService, private URLService: URLService) {
  }
  logedINuser = "";
  userId: any;
  ngOnInit(): void {
    this.URLService.emailaddressUser.subscribe(email => {
      this.logedINuser = email;

    });

    this.URLService.UserIdmm.subscribe(user => {
      this.userId = user
    });

  }

  logout() {
    this.logedINuser = "";
    this.userId = null;
    localStorage.removeItem("UserId");
    localStorage.removeItem("Email")
    window.location.href = "https://127.0.0.1:4200/"
    this.router.navigate(['/'])
  }



}
