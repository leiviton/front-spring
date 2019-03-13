import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FornecedorComponent } from './component/fornecedor.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FornecedorComponent,
        data: {
          title: 'Serviços'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FornecedorRoutingModule { }
