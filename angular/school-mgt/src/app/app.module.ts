import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AdminModule } from './admin/admin.module';
import { SchoolModule } from './school/school.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    SchoolModule,
    AuthModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
