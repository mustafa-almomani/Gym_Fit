import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-tips-admin',
  templateUrl: './tips-admin.component.html',
  styleUrls: ['./tips-admin.component.css']
})
export class TipsAdminComponent {

  searchTerm: string = '';  
  RecipeArray: any[] = [];  
  filteredTipsArray: any[] = [];  

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.GetAllTip();
  }

  GetAllTip() {
    this._ser.GetAllTips().subscribe((data) => {
      this.RecipeArray = data;
      this.filteredTipsArray = this.RecipeArray;  
      console.log(this.RecipeArray);
    });
  }

  filterTips() {
    if (!this.searchTerm) {
      this.filteredTipsArray = this.RecipeArray;
    } else {
      this.filteredTipsArray = this.RecipeArray.filter(tip =>
        tip.tipsName.toLowerCase().includes(this.searchTerm.toLowerCase())  
      );
    }
  }

  delettips(id: any) {
    this._ser.deletTips(id).subscribe(() => {
      alert("Tips deleted successfully");
      this.GetAllTip();  
    });
  }
}
