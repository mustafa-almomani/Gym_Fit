import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-tips-admin',
  templateUrl: './update-tips-admin.component.html',
  styleUrl: './update-tips-admin.component.css'
})
export class UpdateTipsAdminComponent {
  ngOnInit() {
    this.getTipsDetails(this.param);
}
  param: any
  imageFile: any
  DetailsArray: any = {}; 

  changeImage(event: any) {
    this.imageFile = event.target.files[0]
  }
  constructor(private _ser: URLService, private _active: ActivatedRoute) {
    this.param = this._active.snapshot.paramMap.get('id');
  }


  UpdateTips(data: any) {

    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])
    }
    form.append("tipsImage", this.imageFile)
    this._ser.UpdateTips(this.param, form).subscribe((data) => {
      alert("Tips Updated Successfully")
    })
  }
  getTipsDetails(id: any) {
    this._ser.getTipsDetailbyID(id).subscribe((data) => {
      this.DetailsArray = data;  
    });
  }
}
