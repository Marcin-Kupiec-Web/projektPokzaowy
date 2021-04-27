import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [{ path: '', component: PagesComponent,
children: [
  { path: 'start', loadChildren: () => import('./start/start.module').then(m => m.StartModule)},
  { path: '', loadChildren: () => import('./start/start.module').then(m => m.StartModule)},
  { path: 'privileges', loadChildren: () => import('./zarzadzanie/auth-users/privileges/privileges.module').then(m => m.PrivilegesModule)},
  { path: 'roles', loadChildren: () => import('./zarzadzanie/auth-users/role/role.module').then(m => m.RoleModule)},
  { path: 'users', loadChildren: () => import('./zarzadzanie/auth-users/users/users.module').then(m => m.UsersModule)},
  { path: 'groups', loadChildren: () => import('./zarzadzanie/grupy/grupy.module').then(m => m.GrupyModule)},
  { path: 'rejestry', loadChildren: () => import('./zarzadzanie/rejestry/rejestry.module').then(m => m.RejestryModule)},
]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
