import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TariffsComponent } from './pages/tariffs/tariffs.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'add-recordpoint', loadChildren: () => import('./pages/add-recordpoint/add-recordpoint.module').then(m => m.AddRecordpointModule) },
  { path: 'tariffs', component: TariffsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
