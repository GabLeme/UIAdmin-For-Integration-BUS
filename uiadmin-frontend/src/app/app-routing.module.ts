import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfigComponent } from './modules/environment/pages/config/config.component';
import { ServerContentComponent } from './modules/environment/pages/server-content/server-content.component';
import { UsersComponent } from './modules/environment/pages/users/users.component';
import { EnvironmentsListComponent } from './modules/environment/pages/environments-list/environments-list.component';


const routes: Routes = [
  { path: "environment/:id", component: ConfigComponent},
  { path: "environment/:id/server/:serverName", component: ServerContentComponent},
  { path: "users", component: UsersComponent},
  { path: "environments", component: EnvironmentsListComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
