import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-gym',
  templateUrl: './gym.component.html',
  styleUrl: './gym.component.css'
})
export class GymComponent {

  ngOnInit() {
    this.ShowAllGyms();
  }

  constructor(private _ser: URLService) { }

  allgymArray : any 

  ShowAllGyms() {
    this._ser.GetAllGyms().subscribe((data) => {
      this.allgymArray = data
    })
  }

}
