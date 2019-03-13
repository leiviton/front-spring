import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientsComponent } from './component/clients.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ClientsComponent,
        data: {
          title: 'Clientes'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule { }
