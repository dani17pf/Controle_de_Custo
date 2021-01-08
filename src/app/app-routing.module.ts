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
  { path: 'funcoes', loadChildren: './funcoes/funcoes.module#FuncoesPageModule' },
];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
