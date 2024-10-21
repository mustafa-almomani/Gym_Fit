import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-sub-recipe-details',
  templateUrl: './sub-recipe-details.component.html',
  styleUrl: './sub-recipe-details.component.css'
})
export class SubRecipeDetailsComponent {
  parameter: any
  array: any
  ngOnInit() {
    this.parameter = this._rout.snapshot.paramMap.get('id');
    this.getDetails(this.parameter)
    console.log(this.DetailsArray, "details")
  }

  constructor(private _ser: URLService, private _rout: ActivatedRoute) { }

  DetailsArray: any
  getDetails(id: any) {
    this._ser.getSubRecipeDetails(id).subscribe((data) => {

      this.DetailsArray = data
    })

  }
}
