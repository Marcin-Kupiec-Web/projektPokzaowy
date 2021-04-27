import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/shared/guard';


const routes: Routes = [{ path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
canActivate: [AuthGuard] },
{ path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) } ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
