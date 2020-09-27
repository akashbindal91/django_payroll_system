import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SalaryAddComponent } from './salary-structure/salary-add/salary-add.component';
import { SalaryEditComponent } from './salary-structure/salary-edit/salary-edit.component';
import { SalaryListComponent } from './salary-structure/salary-list/salary-list.component';

// const routes: Routes = [];
const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: SalaryListComponent },
  { path: 'edit/:code', component: SalaryEditComponent },
  { path: 'add', component: SalaryAddComponent },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
