import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class URLService {

  isAdmin: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailaddress = this.isAdmin.asObservable();

  userEmail: BehaviorSubject<string> = new BehaviorSubject<string>("");
  emailaddressUser = this.userEmail.asObservable();
  userId: BehaviorSubject<string> = new BehaviorSubject<string>("");
  UserIdmm = this.userId.asObservable();
  month: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  monthforsave = this.month.asObservable();
  GymId: BehaviorSubject<number|undefined> = new BehaviorSubject<number|undefined>(0);
  GymID = this.GymId.asObservable();
  total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalforsub = this.total.asObservable();
  constructor(private http: HttpClient) { }


  staticData = "https://localhost:7072/api";

  register(data: any): Observable<any> {
    return this.http.post(`https://localhost:7072/api/registeruser/register`, data)
  }




  loginUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/registeruser/LOGIN`, data)
  }
 

  ////////  start Profile    //////
  GetUserID(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Profile/Profile/GetUserById/${id}`);
  }
  GetOrderUserID(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Profile/Profile/GetOrdersByUserId/${id}`);
  }
  addTestimonial(id: number, testimonial: string): Observable<any> {
    return this.http.post(`${this.staticData}/Testimonial/AddTestimonial/${id}`, { theTestimonial: testimonial });
  }
  /////////////// end profile ///////////
  GetTypeOfRecipe(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Recipe/Nutrition/GetAllRescipe`);
  }

  getSubRecipe(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Subrecipe/Recipe/GetSubrecipeByRecipeId/${id}`);
  }

  getAllRecipes(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Subrecipe/Recipe/GetAllSubrecipe`);
  }

  AddRecipeTaype(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Recipe/Nutrition/CreateRecipe`, data)
  }

  AddTips(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Tips/Nutrition/CreateTips`, data)
  }
  AddSubRecipe(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Subrecipe/Nutrition/CreateSubRecipe`, data)
  }

  UpdateRecipe(id: any, data: any): Observable<any> {
   
    return this.http.put(`https://localhost:7072/api/Recipe/Nutrition/UpdateRecipe/${id}`, data)
  }

  UpdateTips(id: any, data: any): Observable<any> {

    return this.http.put(`https://localhost:7072/api/Tips/Nutrition/UpdateTips/${id}`, data)
  }

  UpdateSubRecipe(id: any, data: any): Observable<any> {

    return this.http.put(`https://localhost:7072/api/Subrecipe/Nutrition/UpdatesubRecipe/${id}`, data)
  }
  deletrecipe(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Recipe/Nutritiom/DeleteRecipe/${id}`)
  }
  deletTips(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Tips/Nutritiom/DeleteTips/${id}`)
  }

  deletSubrecipe(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Subrecipe/Recipe/DeleteSubrecipe/${id}`)
  }
  getSubRecipeDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Subrecipe/Recipe/GetSubrecipeById/${id}`);
  }

  getRecipeDetailbyID(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Recipe/Nutrition/GetRecipeById/${id}`);
  }
  getTipsDetailbyID(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Tips/Nutrition/GetTipsById/${id}`);
  }
  GetAllGyms(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAllGym`);
  }
  GetAllusers(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Users`);
  }

  GetAllFitness(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAllFitnessClass`);
  }
  getGymDetails(id: any): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetGymById/${id}`)
  }
  getClassDetails(id: any): Observable<any>{
    
    return this.http.get<any>(`${this.staticData}/Admin/GetClassById/${id}`)
  }
  GetAllTips(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Tips/Nutrition/GetAllTips`);
  }


  addContact(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/AOQContact/AddContact`, data)
  }

  //updateService(id: any, data: any): Observable<any> {
  //  return this.http.put(`${this.staticData}/Admin/UpdateGymById/${id}`, data)
  //}
  GetTestimonial(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Testimonial/GetAllAcceptedTestimonial`);
  
  }

  GetTopPrice(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/ContactUs/TopSales`);

  }

  GetAllTestimonialToAccept(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Testimonial/GetAllNotAcceptedTestimonial`);

  }

  UpdateTestimonial(id: any): Observable<any> {
    return this.http.put(`${this.staticData}/Testimonial/AcceptTestimonial/${id}`, {})
  }

  deleteTestimonial(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Testimonial/DeleteTestimonial/${id}`)
  }

  //updateService(id: any, data: any): Observable<any> {
  //  return this.http.put(`${this.staticData}/Admin/UpdateGymById/${id}`, data)
  //}

  GetCntact(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/AOQContact/GetByDesc`);

  }

  deletContact(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/AOQContact/DeleteContact/${id}`)
  }
  //////////// Admin Gym APIs ///////////////////

  addGym(data: any): Observable<any> {

    return this.http.post<any>(`${this.staticData}/Admin/AddNewGym`, data)

  }
  PUTgym(id: any, data: any): Observable<any> {
    
    return this.http.put<any>(`${this.staticData}/Admin/UpdateGymById/${id}`, data)
  }
  deletgym(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Admin/DeletGymById/${id}`)
  }
  //////////// Admin Fitness Class APIs ///////////////////
  addfitnessclass(data: any): Observable<any> {

    return this.http.post<any>(`${this.staticData}/Admin/AddNewFitnessClass`, data)

  }
  PUTfitnessclass(id: any, data: any): Observable<any> {

    return this.http.put<any>(`${this.staticData}/Admin/UpdateFitnessClassById/${id}`, data)
  }
  deletfitnessclass(id: any): Observable<any> {

    return this.http.delete<any>(`${this.staticData}/Admin/DeleteFitnessClassById/${id}`)
  }
  
  createPayment(request: CreatePaymentRequestDto): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.staticData}/Admin/create-payment`, request, { headers });
  }
  executePayment(request: ExecutePaymentRequestDto): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.staticData}/Admin/execute-payment`, request, { headers });
  }
  updateUserProfile(userId: number, formData: FormData): Observable<any> {
    return this.http.post(`${this.staticData}/Profile/UpdateUserInfo/${userId}`, formData);
  }

}
export interface CreatePaymentRequestDto {
  redirectUrl: string;
  total: number;
  message?: string;
  userId: number;
}
export interface ExecutePaymentRequestDto {
  PaymentId: string;
  PayerId: string;
  UserId: number;
  GymId?: number | null;
  FitnessClassId?: number | null;
  StartDate: Date;
  EndDate: Date;
  Total: number;
}
