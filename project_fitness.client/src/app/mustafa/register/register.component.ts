import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  ngOnInit() { }


  constructor(private _ser: URLService, private _router: Router)
  {

  }

  addnewUser(data: any) {
    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key]);
    }

    this._ser.register(form).subscribe(() => {
      // عرض رسالة نجاح باستخدام SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'User Added Successfully!',
        text: 'You have been registered successfully.',
        confirmButtonText: 'OK'
      }).then(() => {
        this._router.navigate(['/Login']);
      });
    },
      (error) => {
        // التحقق من حالة الخطأ
        if (error.status === 400) {
          // عرض رسالة مخصصة إذا كان البريد الإلكتروني موجود بالفعل
          Swal.fire({
            icon: 'error',
            title: 'Email Already Exists',
            text: 'The email you entered is already registered. Please try another one.',
            confirmButtonText: 'OK'
          });
        } else {
          // عرض رسالة خطأ عامة لأي حالة خطأ أخرى
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'An unexpected error occurred. Please try again.',
            confirmButtonText: 'Try Again'
          });
        }
      }
    );
  }

}
