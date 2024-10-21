import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-all-testimonial',
  templateUrl: './all-testimonial.component.html',
  styleUrl: './all-testimonial.component.css'
})
export class AllTestimonialComponent {

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

  deleteContactById(id: any) {
    this._ser.deleteTestimonial(id).subscribe(() => {
      alert("This  message deleted successfully");
      this.gettheTestimonial();
    });
  }

}
