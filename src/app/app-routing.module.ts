import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { NotLoggedInComponent } from './auth/not-logged-in/not-logged-in.component';
import { MainComponent } from './main/main.component';



const routes: Routes = [
  { path: 'login', component: NotLoggedInComponent },
  {path: '', pathMatch: "full", canActivate: [AuthGuard], component: MainComponent},
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
