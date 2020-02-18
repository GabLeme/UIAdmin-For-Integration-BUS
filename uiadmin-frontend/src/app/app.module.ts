import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { ApisService } from './core/apis.service';
import { HttpClientModule } from '@angular/common/http';
import { ServerComponent } from './shared/components/server/server.component';
import { ConfigComponent } from './modules/environment/pages/config/config.component';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { ServerContentComponent } from './modules/environment/pages/server-content/server-content.component';
import { ApisComponent } from './shared/components/apis/apis.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { UsersComponent } from './modules/environment/pages/users/users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from './shared/_modal';
import { EnvironmentsListComponent } from './modules/environment/pages/environments-list/environments-list.component';
import { ServerSelectionComponent } from './shared/components/server-selection/server-selection.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ServerComponent,
    ConfigComponent,
    ServerContentComponent,
    ApisComponent,
    UsersComponent,
    EnvironmentsListComponent,
    ServerSelectionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
    ModalModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  providers: [ ApisService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
