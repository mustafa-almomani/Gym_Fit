import { Component } from '@angular/core';
import { URLService } from '../../url/url.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-fitnessclass',
  templateUrl: './all-fitnessclass.component.html',
  styleUrls: ['./all-fitnessclass.component.css']
})
export class AllFitnessclassComponent {
  servicesArray: any[] = [];
  searchTerm: string = '';

  constructor(private _ser: URLService) { }

  ngOnInit() {
    this.getFitnessClass();
  }

  getFitnessClass() {
    this._ser.GetAllFitness().subscribe((data) => {
      this.servicesArray = data;
      console.log(this.servicesArray, "this.servicesArray");
    });
  }

  filteredServicesArray() {
    return this.servicesArray.filter(item =>
      item.fitnessClassesName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteFitnessClassById(id: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this fitness class? This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deletfitnessclass(id).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Deleted!',
            text: 'The fitness class has been deleted successfully.',
            confirmButtonText: 'OK'
          });
          this.getFitnessClass();
        },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: 'There was an error deleting the fitness class.',
              confirmButtonText: 'OK'
            });
          });
      }
    });
  }
}
