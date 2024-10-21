import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';  // استيراد SweetAlert2

@Component({
  selector: 'app-updatefitnessclass',
  templateUrl: './updatefitnessclass.component.html',
  styleUrls: ['./updatefitnessclass.component.css']
})
export class UpdatefitnessclassComponent {

  param: any;
  imageFile: any;
  Details: any;

  constructor(private _ser: URLService, private _active: ActivatedRoute) { }

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');
    this.getDetails(this.param);
  }

  changeImageevent(event: any) {
    this.imageFile = event.target.files[0];
  }

  updateFitness(data: any) {
   

    var form = new FormData();

    for (let key in data) {
      form.append(key, data[key]);
    }

    form.append("fitnessClassesImage", this.imageFile);
    

    this._ser.PUTfitnessclass(this.param, form).subscribe(() => {
      // عرض رسالة نجاح باستخدام SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Update Successful!',
        text: 'The fitness class has been updated successfully.',
        confirmButtonText: 'OK'
      });
    },
      (error) => {
        // عرض رسالة خطأ في حالة الفشل
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was an error updating the fitness class. Please try again.',
          confirmButtonText: 'Try Again'
        });
      });
  }

  getDetails(id: any) {
   
    this._ser.getClassDetails(id).subscribe((data: any) => {
      this.Details = data;
      console.log(this.Details, 'details');
    });
  }

}
