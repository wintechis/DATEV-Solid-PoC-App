import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NotLoggedInComponent } from './auth/not-logged-in/not-logged-in.component';
import { TestComponent } from './auth/test/test.component';



const routes: Routes = [
  { path: 'login', component: NotLoggedInComponent },
  {path: '', pathMatch: "full", canActivate: [AuthGuard], component: TestComponent},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
