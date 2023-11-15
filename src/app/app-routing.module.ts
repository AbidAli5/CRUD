import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'customer',
    loadChildren: () =>
      import('./modules/customer/customer.module').then(
        (mod) => mod.CustomerModule
      ),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./modules/product/product.module').then(
        (mod) => mod.ProductModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
