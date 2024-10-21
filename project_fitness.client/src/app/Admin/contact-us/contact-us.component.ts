import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'] // تصحيح "styleUrl" إلى "styleUrls"
})
export class ContactUsComponent {

  ConactArray: any; // مصفوفة لتخزين بيانات جهات الاتصال

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.ReplayContact(); // استدعاء الدالة لجلب البيانات عند بدء المكون
  }

  // دالة لجلب بيانات جهات الاتصال
  ReplayContact() {
    this._ser.GetCntact().subscribe((data) => {
      this.ConactArray = data; // تخزين البيانات المسترجعة
      console.log(this.ConactArray, "this.ConactArray");
    });
  }

  // دالة لحذف جهة الاتصال بناءً على المعرف
  deleteContactById(id: any) {
    this._ser.deletContact(id).subscribe(() => {
      alert("This message deleted successfully"); 
      this.ReplayContact(); 
    });
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString); 
    return date.toLocaleString('en-US', { 
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

  // دالة لفتح البريد الإلكتروني عند النقر على الزر
  openMail(email: string) {
    const mailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`;
    window.open(mailUrl, '_blank'); // فتح رابط البريد الإلكتروني في نافذة جديدة
  }
}
