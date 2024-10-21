import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // استيراد Router
import { URLService } from '../url/url.service';
import Swal from 'sweetalert2';  // استيراد SweetAlert2

@Component({
  selector: 'app-edit-personal-info',
  templateUrl: './edit-personal-info.component.html',
  styleUrls: ['./edit-personal-info.component.css']
})
export class EditPersonalInfoComponent implements OnInit {
  personalInfo: any = {
    userName: '',
    userPhone: '',
    userAddress: ''
  };

  selectedFile: File | null = null;
  userId: number | undefined;

  constructor(private _ser: URLService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId = Number(localStorage.getItem('UserId'))
    console.log('Extracted userId from URL:', this.userId);
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('UserName', this.personalInfo.userName);
    formData.append('UserPhone', this.personalInfo.userPhone);
    formData.append('UserAddress', this.personalInfo.userAddress);

    if (this.selectedFile) {
      formData.append('UserImage', this.selectedFile);
    }

    if (this.userId) {
      this._ser.updateUserProfile(this.userId, formData).subscribe({
        next: (response: any) => {
          console.log('Profile updated successfully', response);

          // عرض نافذة نجاح عند نجاح التعديل باستخدام SweetAlert
          Swal.fire({
            icon: 'success',
            title: 'Profile Updated!',
            text: 'Your profile has been updated successfully.',
            confirmButtonText: 'OK'
          }).then(() => {
            // إعادة توجيه المستخدم إلى صفحة البروفايل
            this.router.navigate(['/profile']);
          });
        },
        error: (error: any) => {
          console.error('There was an error!', error);

          // عرض نافذة خطأ في حالة الفشل باستخدام SweetAlert
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'There was an error updating your profile. Please try again.',
            confirmButtonText: 'OK'
          });
        }
      });
    } else {
      console.error('User ID is missing!');
    }
  }
}
