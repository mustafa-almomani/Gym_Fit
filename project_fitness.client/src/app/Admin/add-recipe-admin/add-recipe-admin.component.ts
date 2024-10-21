import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-add-recipe-admin',
  templateUrl: './add-recipe-admin.component.html',
  styleUrls: ['./add-recipe-admin.component.css'] // Fix the property name here
})
export class AddRecipeAdminComponent {

  image: any;

  constructor(private _src: URLService) { }

  changeImage(event: any) {
    this.image = event.target.files[0];
  }

  AddNewRecipeType(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("RecipeImage", this.image);
    this._src.AddRecipeTaype(form).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Recipe Added!',
        text: 'Recipe added successfully.',
        confirmButtonText: 'OK'
      });
    });
  }
}
