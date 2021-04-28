import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {     // so pode acessar se tiver logado canActivate: [AuthGuard]
    path: 'home',
    canActivate: [AuthGuard], loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
    //canActivate: [AuthGuard], loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
   // canActivate: [AuthGuard], loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'list',
    canActivate: [AuthGuard], loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    canActivate: [LoggedGuard], loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'cadastro/:id', // essa rota vai ter o parametro id: que vai pegar o id do cadastro
    loadChildren: () => import('./cadastro/cadastro.module').then(m => m.CadastroPageModule)
  },
  {
    path: 'abastecimentos',
    loadChildren: './abastecimentos/abastecimentos.module#AbastecimentosPageModule'
  },
  {
    path: 'abastecimentos/:id',
    loadChildren: './abastecimentos/abastecimentos.module#AbastecimentosPageModule'
  },
  {
    path: 'list-abatecimento',
    loadChildren: './list-abatecimento/list-abatecimento.module#ListAbatecimentoPageModule'
  },
  {
    path: 'manutencao',
    loadChildren: './manutencao/manutencao.module#ManutencaoPageModule'
  },
  {
    path: 'manutencao/:id',
    loadChildren: './manutencao/manutencao.module#ManutencaoPageModule'
  },
  {
    path: 'list-manutencao',
    loadChildren: './list-manutencao/list-manutencao.module#ListManutencaoPageModule'
  },
  {
    path: 'alerta',
    loadChildren: './alerta/alerta.module#AlertaPageModule'
  },
  {
    path: 'alerta/:id',
    loadChildren: './alerta/alerta.module#AlertaPageModule'
  },
  {
    path: 'list-alerta',
    loadChildren: './list-alerta/list-alerta.module#ListAlertaPageModule'
  },
  {
    path: 'user',
    loadChildren: './user/user.module#UserPageModule'
  },
 // {
   // path: 'principal',
   // loadChildren: './principal/principal.module#PrincipalPageModule'
  //},

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
