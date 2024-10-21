import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'; // استيراد SweetAlert2
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-updategym',
  templateUrl: './updategym.component.html',
  styleUrls: ['./updategym.component.css']
})
export class UpdategymComponent {

  param: any;
  imageFile: any;
  DetailsArray: any;

  constructor(private _ser: URLService, private _active: ActivatedRoute) { }

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id');
    this.getDetails(this.param);
  }

  changeImageevent(event: any) {
    this.imageFile = event.target.files[0];
  }

  updateServices(data: any) {
    

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    form.append("gymImage", this.imageFile);

    
    this._ser.PUTgym(this.param, form).subscribe(() => {
      // عرض رسالة نجاح باستخدام SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Update Successful!',
        text: 'The gym has been updated successfully.',
        confirmButtonText: 'OK'
      });
    },
      (error) => {
        // عرض رسالة خطأ في حالة الفشل
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'There was an error updating the gym. Please try again.',
          confirmButtonText: 'Try Again'
        });
      });
  }

  getDetails(id: any) {
    this._ser.getGymDetails(id).subscribe((data: any) => {
      this.DetailsArray = data;
      console.log(this.DetailsArray, 'details');
    });
  }
}
