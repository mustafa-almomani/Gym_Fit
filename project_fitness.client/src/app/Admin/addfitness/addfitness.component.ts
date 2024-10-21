import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';  // استيراد SweetAlert2

@Component({
  selector: 'app-addfitness',
  templateUrl: './addfitness.component.html',
  styleUrls: ['./addfitness.component.css']
})
export class AddfitnessComponent {
  ngOnInit() { }

  constructor(private _ser: URLService, private _router: Router) { }

  image: any
  changeImage(event: any) {
    this.image = event.target.files[0];
  }

  addNewfitnessclass(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    form.append("fitnessClassesImage", this.image);

    this._ser.addfitnessclass(form).subscribe(() => {
      // عرض رسالة نجاح باستخدام SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Fitness Class Added!',
        text: 'The fitness class has been added successfully.',
        confirmButtonText: 'OK'
      });
      // يمكنك توجيه المستخدم إلى صفحة أخرى بعد نجاح العملية
      this._router.navigate(['/Dashboard']);
    },
      (error) => {
        // عرض رسالة خطأ في حالة الفشل
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error || 'There was an error adding the fitness class.',
          confirmButtonText: 'Try Again'
        });
      });
  }
}
