import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders/orders.component';

const routes: Routes = [{
  path: 'orders',
  component: OrdersComponent,
  data: { title: 'List of Orders' }
},
{
  path: '',
  redirectTo: '/orders',
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
