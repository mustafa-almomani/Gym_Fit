import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-recipe-admain',
  templateUrl: './recipe-admain.component.html',
  styleUrls: ['./recipe-admain.component.css']
})
export class RecipeAdmainComponent {

  searchTerm: string = ''; 
  RecipeArray: any[] = [];  
  filteredRecipeArray: any[] = [];  
  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.GetAllRecipe();
  }

  GetAllRecipe() {
    this._ser.GetTypeOfRecipe().subscribe((data) => {
      this.RecipeArray = data;
      this.filteredRecipeArray = this.RecipeArray;  
      console.log("All Recipes: ", this.RecipeArray);  
    });
  }

  filterRecipes() {
    console.log("Search Term: ", this.searchTerm); 
    if (!this.searchTerm) {
      this.filteredRecipeArray = this.RecipeArray;
    } else {
      this.filteredRecipeArray = this.RecipeArray.filter(recipe =>
        recipe.recipeName.toLowerCase().includes(this.searchTerm.toLowerCase())  
      );
      console.log("Filtered Recipes: ", this.filteredRecipeArray);  
    }
  }

  deletrecipe(id: any) {
    this._ser.deletrecipe(id).subscribe(() => {
      alert("Recipe deleted successfully");
      this.GetAllRecipe();  
    });
  }
}
