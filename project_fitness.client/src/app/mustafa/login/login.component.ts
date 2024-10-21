import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ProductDetailsService } from '../../Rahaf/product-details.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  goToCart: any = localStorage.getItem("Cart")
  ngOnInit() { }
  constructor(private _ser: URLService, private _router: Router, private ProductDetails: ProductDetailsService) { }
  loginNewUser(data: any) {
    
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    this._ser.loginUser(form).subscribe((newData) => {
      console.log("what is this" + newData.userEmail);
      this._ser['isAdmin'].next(newData.isAdmin);
      console.log(this._ser['isAdmin'].next(newData.isAdmin))

      this._ser['userEmail'].next(newData.userEmail);
      console.log(this._ser['userEmail'].next(newData.userEmail))

      this._ser['userId'].next(newData.userId);
      console.log("ssssssssssssss",this._ser['userId'].next(newData.userId))

      localStorage.setItem('UserId', newData.userId);
      this.ProductDetails.addLocalToUser(newData.userEmail);
      localStorage.setItem('Email', newData.userEmail);

      if (newData.isAdmin) {
        // عرض رسالة نجاح للمشرف (admin)
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome Admin!',
          confirmButtonText: 'OK'
        }).then(() => {
          
          this._router.navigate(['/Dashboard']);
        });

      } else {
        // عرض رسالة نجاح للمستخدم العادي
        Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Welcome to the Home Page!',
          confirmButtonText: 'OK'
        }).then(() => {
          if (this.goToCart) {
            localStorage.removeItem("Cart")
            this._router.navigate(['/cart']);

          } else {
            this._router.navigate(['/Home']);
          }
          
        });
      }
    }, (error) => {
      // التحقق من رمز الخطأ
      if (error.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'No account found with this email address. Please try again.',
          confirmButtonText: 'Try Again'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.error || 'An unexpected error occurred. Please try again.',
          confirmButtonText: 'Try Again'
        });
      }
    });
  }


}
