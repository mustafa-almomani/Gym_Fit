import { Component, OnInit } from '@angular/core';
import { URLService } from '../../url/url.service';
import Swal from 'sweetalert2'; // استيراد مكتبة SweetAlert2

@Component({
  selector: 'app-all-gyms',
  templateUrl: './all-gyms.component.html',
  styleUrls: ['./all-gyms.component.css']  // تأكد من تصحيح الاسم إلى styleUrls وليس styleUrl
})
export class AllGymsComponent implements OnInit {

  servicesArray: any[] = [];  // جميع الصالات الرياضية
  filteredServicesArray: any[] = [];  // الصالات الرياضية بعد التصفية
  searchTerm: string = '';  // مصطلح البحث

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.getGyms();
  }

  getGyms() {
    this._ser.GetAllGyms().subscribe((data) => {
      this.servicesArray = data;
      this.filteredServicesArray = this.servicesArray;  // في البداية عرض جميع البيانات
      console.log(this.servicesArray, "this.servicesArray");
    });
  }

  filterServices() {
    if (!this.searchTerm) {
      this.filteredServicesArray = this.servicesArray;  // عرض جميع الصالات الرياضية إذا كان البحث فارغًا
    } else {
      this.filteredServicesArray = this.servicesArray.filter(service =>
        service.gymName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  deleteGymById(id: any) {
    // عرض نافذة التأكيد
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this gym? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        // تنفيذ عملية الحذف إذا تم التأكيد
        this._ser.deletgym(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The gym has been deleted successfully.',
            confirmButtonText: 'OK'
          });
          this.getGyms();  // تحديث قائمة الصالات بعد الحذف
        },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the gym.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
}
