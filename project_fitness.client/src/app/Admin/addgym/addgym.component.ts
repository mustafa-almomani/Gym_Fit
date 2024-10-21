import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import Swal from 'sweetalert2';  // استيراد SweetAlert2

@Component({
  selector: 'app-addgym',
  templateUrl: './addgym.component.html',
  styleUrls: ['./addgym.component.css']  // تعديل الاسم ليكون style**s** بدلاً من style
})
export class AddgymComponent {
  ngOnInit() { }

  constructor(private _ser: URLService) { }

  image: any
  changeImage(event: any) {
    
    this.image = event.target.files[0];
  }

  addnewGym(data: any) {
    
    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key]);
    }

    form.append("gymImage", this.image);

    this._ser.addGym(form).subscribe(() => {
      // عرض رسالة نجاح باستخدام SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Gym Added Successfully!',
        text: 'The gym has been added successfully.',
        confirmButtonText: 'OK'
      });
    },
      (error) => {
        // عرض رسالة خطأ في حالة الفشل
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'Something went wrong. Please try again.',
          confirmButtonText: 'Try Again'
        });
      });
  }
}
