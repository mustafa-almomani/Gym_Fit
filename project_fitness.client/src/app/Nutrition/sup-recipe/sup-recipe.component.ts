import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-sup-recipe',
  templateUrl: './sup-recipe.component.html',
  styleUrl: './sup-recipe.component.css'
})
export class SupRecipeComponent {

  parameter: any
  servicesArray: any
  ngOnInit() {
    this.parameter = this._route.snapshot.paramMap.get("id");
    this.getsubrecipr(this.parameter);
  }
  subRecipeData: any
  constructor(private _ser: URLService, private _route: ActivatedRoute) { }
  getsubrecipr(id: any) {
    this._ser.getSubRecipe(id).subscribe((data) => {
      this.subRecipeData = data
      console.log("this.subServiceData", this.subRecipeData)
    })
  }
}
