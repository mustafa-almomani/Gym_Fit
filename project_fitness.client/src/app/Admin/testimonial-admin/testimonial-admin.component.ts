import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-testimonial-admin',
  templateUrl: './testimonial-admin.component.html',
  styleUrl: './testimonial-admin.component.css'
})
export class TestimonialAdminComponent {

  ngOnInit() {
    this.GetAllTestimonial();
  }


  constructor(private _ser: URLService) {

  }

  TestimonialArray: any
  GetAllTestimonial() {
    this._ser.GetAllTestimonialToAccept().subscribe((data) => {
      this.TestimonialArray = data
      console.log(this.TestimonialArray, "this.TestimonialArray")
    })
  }

  deleteContactById(id: any) {
    this._ser.deleteTestimonial(id).subscribe(() => {
      alert("This  message deleted successfully");
      this.GetAllTestimonial();
    });
  }

  AcceptTheTestimonial(id: any) {
    this._ser.UpdateTestimonial(id).subscribe(() => {
      
      alert("This  message accepted successfully");
      this.GetAllTestimonial();
    })
  }


}
