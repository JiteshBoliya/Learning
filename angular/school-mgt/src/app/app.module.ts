import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { AdminModule } from './features/admin/admin.module';
import { SchoolModule } from './features/school/school.module';
import { AuthModule } from './features/auth/auth.module';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    AdminModule,
    SchoolModule,
    AuthModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
