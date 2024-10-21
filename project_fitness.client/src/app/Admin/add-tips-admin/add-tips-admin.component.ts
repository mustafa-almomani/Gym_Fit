import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-add-tips-admin',
  templateUrl: './add-tips-admin.component.html',
  styleUrl: './add-tips-admin.component.css'
})
export class AddTipsAdminComponent {

  constructor(private _src: URLService) {

  }

  image: any
  changeImage(event: any) {

    this.image = event.target.files[0]

  }

  AddNewTips(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("tipsImage", this.image)
    this._src.AddTips(form).subscribe(() => {
      alert("Tips added successfully")
    })
  }
}

