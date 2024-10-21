import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})
export class FilterUsersPipe implements PipeTransform {

  transform(users: any[], searchTerm: string): any[] {
    if (!users || !searchTerm) {
      return users;
    }

    // تحويل مصطلح البحث إلى أحرف صغيرة للبحث دون النظر لحالة الأحرف
    searchTerm = searchTerm.toLowerCase();

    return users.filter(user =>
      user.userName.toLowerCase().includes(searchTerm)
    );
  }

}
