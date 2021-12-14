import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotLoggedInComponent } from './auth/not-logged-in/not-logged-in.component';
import { TestComponent } from './auth/test/test.component';



const routes: Routes = [
  { path: 'login', component: NotLoggedInComponent },
  { path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
