import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { ProductDetailsService } from '../product-details.service';
import { URLService } from '../../url/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'] // Correct spelling here
})
export class PaymentComponent {
  cartItems: any[] = [];
  logedINuser = "";
  userId: any;
  test = "";

  constructor(private cartService: CartService, private router: Router, private ProductService: ProductDetailsService, private URLService: URLService) {
  }

  ngOnInit(): void {
    this.URLService.emailaddressUser.subscribe(email => {
      this.logedINuser = email;
      this.test = email;

    });

    this.URLService.UserIdmm.subscribe(user => {
      this.userId = user
    });


      this.getCartItemsUser()

    this.getuser(this.userId)


  }

  getCartItemsUser() {
    this.cartService.getCartItems(this.userId).subscribe(
      (items) => {
        this.cartItems = items; 
      },
      (error) => {
        console.error('Error fetching cart items:', error); 
      }
    );
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartTotalPLUS5(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity) + 5, 0);
  }

  userDATA: any = {};  

  getuser(id: any) {
    this.ProductService.getUSER(id).subscribe((data) => {
      this.userDATA = data;
      console.log("User data: ", this.userDATA); 
    });
  }

  selectedPayment: string = '';

  PayPalCheck() {
    if (this.selectedPayment == ""){
      
        Swal.fire({
          icon: "warning",
          title: "You Must Select A Payment Method",
          showConfirmButton: false,
          timer: 2000,
        });
      
    } else {
      if (this.selectedPayment == "cash") {
        this.ProductService.cashCheckout(this.userId).subscribe((data) => {
          Swal.fire({
            icon: "success",
            title: "Order Placed Successfully!",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => {
            this.router.navigate(['/']);  
          });

        },
          (error) => {
            Swal.fire({
              icon: "warning",
              title: `${error.error}`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        );

      } else {
        this.ProductService.paypalCheckout(this.userId).subscribe(
          (data) => {
            const width = 600;
            const height = 700;
            const left = (screen.width / 2) - (width / 2);
            const top = (screen.height / 2) - (height / 2);

            const popupWindow = window.open(
              data.approvalUrl,
              'PayPal Payment',
              `width=${width}, height=${height}, top=${top}, scrollbars=yes, resizable=yes`
            );

            const checkWindowClosed = setInterval(() => {
              if (popupWindow && popupWindow.closed) {
                clearInterval(checkWindowClosed);
                Swal.fire({
                  icon: "success",
                  title: "Order Placed Successfully!",
                  showConfirmButton: false,
                  timer: 2000,
                }).then(() => {
                  this.router.navigate(['/']);  
                });
              }
            }, 500);
          },
          (error) => {
            Swal.fire({
              icon: "warning",
              title: `${error.error}`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        );
      }
    }
    
    
  }

}
