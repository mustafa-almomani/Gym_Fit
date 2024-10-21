import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { URLService } from './url/url.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];

  searchTerm: string = '';
  allusers: any[] = [];
  isAdmin = ""
  userEmail = ""
  userId :(any)
  constructor(private http: HttpClient, private _ser: URLService) {}
  bool = "false";
  ngOnInit() {
    this.getForecasts();
    this._ser.emailaddress.subscribe((data) => {
      this.isAdmin = data;
      
      console.log(this.isAdmin)
  
    })
    this._ser.emailaddressUser.subscribe((data) => {
      this.userEmail = data;
      console.log(this.userEmail)

    })
    this._ser.UserIdmm.subscribe((data) => {
      this.userId = data;
      console.log(this.userId)

    })
  }

  getForecasts() {
    this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
      (result) => {
        this.forecasts = result;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  title = 'project_fitness.client';
}
