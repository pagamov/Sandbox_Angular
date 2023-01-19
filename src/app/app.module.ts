import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
// import { MatDialogModule } from '@angular/material/dialog';
// import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateModalComponent } from './home/create-modal/create-modal.component';
import { ChangeModalComponent } from './home/change-modal/change-modal.component';



@NgModule({
  declarations: [AppComponent, LoginComponent, SignComponent, HomeComponent, CreateModalComponent, ChangeModalComponent],
  imports: [MatSlideToggleModule, BrowserModule, FormsModule, AppRoutingModule, BrowserAnimationsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
