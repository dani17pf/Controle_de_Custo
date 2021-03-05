import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListAbatecimentoPage } from './list-abatecimento.page';

const routes: Routes = [
  {
    path: '',
    component: ListAbatecimentoPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListAbatecimentoPage]
})
export class ListAbatecimentoPageModule {}
