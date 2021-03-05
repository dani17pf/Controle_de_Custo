import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AbastecimentosPage } from './abastecimentos.page';

const routes: Routes = [
  {
    path: '',
    component: AbastecimentosPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AbastecimentosPage]
})
export class AbastecimentosPageModule {}
