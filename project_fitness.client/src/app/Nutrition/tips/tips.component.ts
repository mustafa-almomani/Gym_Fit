import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-tips',
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent {
  ngOnInit()
  {
    this.GetTips()
  }
  constructor(private _ser:
    URLService) { }
  TipsArray: any
  GetTips() {
    this._ser.GetAllTips().subscribe((data) => {
      this.TipsArray = data
      console.log(this.TipsArray)

    })
  }
}
