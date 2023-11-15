import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerModel } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { map, of, switchMap, toArray } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<CustomerModel>;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private _customerService: CustomerService,
    private router: Router
  ) {
    // this.http.get('http://localhost:3000/customers').subscribe((data: any) => {
    //   let newData = data.map((item: any) => {
    //     let { address, ...rest } = item;
    //     address = address.street + ' ' + address.city + ' ' + address.state+" "+address.zip_code;
    //     return { ...rest,address };
    //   });
    //   this.dataSource = new MatTableDataSource(newData);
    //   this.displayedColumns = Object.keys(this.dataSource.data[0]);
    //   this.displayedColumns.push('actions');
    //   console.log(this.displayedColumns);
    // });
    this.getAllCustomer();
  }

  ngOnInit() {}

  getAllCustomer() {
    this._customerService
      .getAllCustomers()
      .pipe(
        switchMap((data: any) => of(...data)),
        map((item: any) => {
          let { address, ...rest } = item;
          address =
            address.street +
            ' ' +
            address.city +
            ' ' +
            address.state +
            ' ' +
            address.zip_code;
          return { ...rest, address };
        }),
        toArray()
      )
      .subscribe((data: any) => {
        this.dataSource = new MatTableDataSource(data);
        this.displayedColumns = Object.keys(this.dataSource.data[0]);
        this.displayedColumns.push('actions');
        console.log(this.displayedColumns);
      });
  }

  deleteCustomer(id: number) {
    this._customerService.deleteCustomer(id).subscribe({
      next: (res) => {
        if (res) {
          alert('Customer Deleted Successfully');
          this.getAllCustomer();
        }
      },
    });
  }
  editCustomr(id: number) {
    this.router.navigate(['customer/form', id]);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
