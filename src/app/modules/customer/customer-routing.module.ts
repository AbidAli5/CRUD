import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { CustomerFormComponent } from './form/form.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'form', component: CustomerFormComponent },
  { path: 'form/:id', component: CustomerFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule {}
