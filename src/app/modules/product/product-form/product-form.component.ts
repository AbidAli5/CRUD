import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ProductService } from '../product.service';
import { Product } from '../product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  btnText: string = 'save';
  productId: number = 0;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();

    this._activatedRoute.paramMap.subscribe((res: Params) => {
      const id = +res['get']('id');
      if (id > 0) {
        this.productId = id;
        this.btnText = 'Update';
        this.getProductById(id);
        this.productForm.get('id')?.disable();
      }
    });
  }

  createForm() {
    this.productForm = this.fb.group({
      id: [null, Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
    });
  }

  getProductById(id: number) {
    this.productService.getProductById(id).subscribe({
      next: (res: Product) => {
        console.log(res);
        this.updateFormValues(res);
      },
    });
  }

  updateFormValues(product: Product) {
    this.productForm.patchValue(product);
  }

  onSubmit() {
    if (this.productId > 0) {
      if (this.productForm.invalid) {
        this.productForm.markAllAsTouched();
        return;
      }

      if (this.productForm.valid) {
        const product: Product = this.productForm.value as Product;
        this.productService.updateProduct(this.productId, product).subscribe({
          next: (res) => {
            if (res) {
              alert('Product updated successfully');
            }
          },
        });
      }
    } else {
      if (this.productForm.invalid) {
        this.productForm.markAllAsTouched();
        return;
      }

      if (this.productForm.valid) {
        const product: Product = this.productForm.value as Product;
        this.productService.createProduct(product).subscribe({
          next: (res) => {
            if (res) {
              alert('Product created successfully');
            }
          },
        });
      }
    }
  }
}
