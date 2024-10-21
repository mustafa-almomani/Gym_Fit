import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-fitness',
  templateUrl: './fitness.component.html',
  styleUrl: './fitness.component.css'
})
export class FitnessComponent {
  ngOnInit() {
    this.ShowAllFitness();
  }

  constructor(private _ser: URLService) { }

  allgymArray: any

  ShowAllFitness() {
    this._ser.GetAllFitness().subscribe((data) => {
      this.allgymArray = data
    })
  }
}
