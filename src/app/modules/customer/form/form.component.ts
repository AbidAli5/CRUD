import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomerModel } from '../customer.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class CustomerFormComponent implements OnInit {
  customerForm!: FormGroup;
  btnText = 'Save';
  customerId = 0;

  constructor(
    private fb: FormBuilder,
    private _customerService: CustomerService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.createForm();
    this.route.paramMap.subscribe((res : Params)=>{
      const id = +res['get']('id')
      if(id >0){
        this.customerId = id
        this.btnText = "Update"
        this.getCustomerById(id)
        this.customerForm.get('id')?.disable()

      }
    })
  }
  getCustomerById(id: number) {
    this._customerService.getCustomerById(id).subscribe({
      next: (res: CustomerModel) => {
        console.log(res);
        this.updateFormValues(res);
      },
    });
  }

  updateFormValues(customer: CustomerModel) {
    this.customerForm.patchValue(customer);
  }

  createForm() {
    this.customerForm = this.fb.group({
      id: [null, Validators.required],
      first_name: [null, Validators.required],
      last_name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.customerId > 0) {
      if (this.customerForm.invalid) {
        this.customerForm.markAllAsTouched();
        return;
      }

      if (this.customerForm.valid) {
        const customer: CustomerModel = this.customerForm
          .value as CustomerModel;
        this._customerService
          .updateCustomer(this.customerId, customer)
          .subscribe({
            next: (res) => {
              if (res) {
                alert('Customer updated successfully');
              }
            },
          });
      }
    } else {
      if (this.customerForm.invalid) {
        this.customerForm.markAllAsTouched();
        return;
      }

      if (this.customerForm.valid) {
        const customer: CustomerModel = this.customerForm
          .value as CustomerModel;
        this._customerService.createCustomer(customer).subscribe({
          next: (res) => {
            if (res) {
              alert('Customer created successfully');
            }
          },
        });
      }
    }
  }
}
