import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrl: './testimonial.component.css'
})
export class TestimonialComponent {
  ngOnInit() {
    this.gettheTestimonial();
  }

  constructor(private _ser: URLService) {

  }

  TestimonialArray: any
  gettheTestimonial() {
    this._ser.GetTestimonial().subscribe((data) => {
      this.TestimonialArray = data
      console.log(this.TestimonialArray, "this.TestimonialArray")
    }) 
  }
}
