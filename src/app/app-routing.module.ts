import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from './shared/guard/auth.guard';
import { DefaultRouteComponent } from './shared/default-route/default-route.component';
import { LoginComponent } from "./auth/login/login.component";
import { MainComponent } from "./weather/main/main.component";

const appRoutes: Routes = [{
  path: 'auth',
  component: LoginComponent
}, {
  path: 'weather',
  canActivate: [AuthGuard],
  component: MainComponent
},{
  path: '',
  redirectTo: '**',
  pathMatch: 'full'
}, {
  path: '**',
  component: DefaultRouteComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }