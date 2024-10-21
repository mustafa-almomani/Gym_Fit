import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-top-price',
  templateUrl: './top-price.component.html',
  styleUrl: './top-price.component.css'
})
export class TopPriceComponent {

  ngOnInit() {
    this.gettheProduct();
  }

  constructor(private _ser: URLService) {

  }

  ProductArray: any
  gettheProduct() {
    this._ser.GetTopPrice().subscribe((data) => {
      this.ProductArray = data
      console.log(this.ProductArray, "this.ProductArray")
    })
  }

}
