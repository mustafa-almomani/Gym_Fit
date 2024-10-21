import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-recips',
  templateUrl: './recips.component.html',
  styleUrl: './recips.component.css'
})
export class RecipsComponent {
  ngOnInit() {
    this.GetAllRecipe()
  }
  constructor(private _ser:
    URLService) { }

 RecipeArray: any
  GetAllRecipe() {

    this._ser.GetTypeOfRecipe().subscribe((data) => {
      this.RecipeArray = data
      console.log(this.RecipeArray)

    })
  }
}
