import { Component, OnInit } from '@angular/core';
import { URLService } from '../../url/url.service';
import Swal from 'sweetalert2'; // Import SweetAlert2

@Component({
  selector: 'app-add-subrecipe-admin',
  templateUrl: './add-subrecipe-admin.component.html',
  styleUrls: ['./add-subrecipe-admin.component.css']
})
export class AddSubrecipeAdminComponent implements OnInit {

  RecipeArray: any[] = [];
  image: any;

  constructor(private _src: URLService) { }

  ngOnInit() {
    this.GetAllRecipe();
  }

  changeImage(event: any) {
    this.image = event.target.files[0];
  }

  AddNewSubRecipe(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("subRecipeImage", this.image);
    this._src.AddSubRecipe(form).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'SubRecipe Added!',
        text: 'SubRecipe added successfully.',
        confirmButtonText: 'OK'
      });
    });
  }

  GetAllRecipe() {
    this._src.GetTypeOfRecipe().subscribe((data) => {
      this.RecipeArray = data;
      console.log("All Recipes: ", this.RecipeArray);
    });
  }
}
