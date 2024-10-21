import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-alluser',
  templateUrl: './alluser.component.html',
  styleUrl: './alluser.component.css'
})
export class AlluserComponent {

  ngOnInit() {

    this.getFitnessClass();
  }
  constructor(private _ser: URLService) {


  }

  searchTerm: string = ''; 

  allusers: any

  getFitnessClass() {
    this._ser.GetAllusers().subscribe((data) => {
      this.allusers = data
      console.log(this.allusers, "this.servicesArray")
    })

  }
}
