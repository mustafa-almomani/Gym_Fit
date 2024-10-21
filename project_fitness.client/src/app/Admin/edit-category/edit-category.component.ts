import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoryService } from '../admin-category/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent {
  param: any;
  imageFile: any;
  DetailsArray: any;

  constructor(private _ser: URLService, private _active: ActivatedRoute, private CategoryService: CategoryService) { }

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


    this.CategoryService.updateCategory(this.param, form).subscribe(() => {
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
    this.CategoryService.getCategory(id).subscribe((data: any) => {
      this.DetailsArray = data;
      console.log(this.DetailsArray, 'details');
    });
  }
}
