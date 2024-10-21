

import { Component, OnInit } from '@angular/core';
import { URLService } from '../../url/url.service'; 
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-sub-recipes-admin',
  templateUrl: './update-sub-recipes-admin.component.html',
  styleUrls: ['./update-sub-recipes-admin.component.css']
})
export class UpdateSubRecipesAdminComponent implements OnInit {

  param: any;
  imageFile: any;
  DetailsArray: any = {};  
  RecipeArray: any[] = [];
  constructor(private _ser: URLService, private _active: ActivatedRoute, private _src: URLService) {
    this.param = this._active.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.getDetails(this.param);  
    this.GetAllRecipe(); 
  }

  changeimageevevnt(event: any) {
    this.imageFile = event.target.files[0];
  }

  UpdateSubRecipeAdmin(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("subRecipeImage", this.imageFile);

    this._ser.UpdateSubRecipe(this.param, form).subscribe(() => {
      alert("Subrecipe Updated Successfully");
    });
  }

  getDetails(id: any) {
    this._ser.getSubRecipeDetails(id).subscribe((data) => {
      this.DetailsArray = data;  
    });
  }

  GetAllRecipe() {
    this._src.GetTypeOfRecipe().subscribe((data) => {
      this.RecipeArray = data;
      console.log("All Recipes: ", this.RecipeArray);
    });
  }
}

