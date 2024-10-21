import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  ngOnInit() {
  }
  mail: string = 'https://mail.google.com/mail/?view=cm&fs=1&to=ahmad.alqadomi02@gmail.com';
  constructor(private _ser: URLService) {

  }

  AddNewMessage(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }

    this._ser.addContact(form).subscribe(() => {
      alert("The Message Send Successfully")
    },
      (error) => {
        if (error.status === 400) {
          alert("There was an error in the data you submitted. Please check your inputs.");
        } else if (error.status === 500) {
          alert("An internal server error occurred. Please try again later.");
        } else {
          alert("An unexpected error occurred: " + error.message);
        }
      }
    );
  }
}
