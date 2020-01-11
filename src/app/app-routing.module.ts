import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TariffsComponent } from './pages/tariffs/tariffs.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'tariffs', component: TariffsComponent},
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
