import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { DemoMaterialModule } from './home/create-modal/material-module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignComponent } from './sign/sign.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CreateModalComponent, DialogOverviewDialog } from './home/create-modal/create-modal.component';
import { ChangeModalComponent, DialogOverviewDialog_Change } from './home/change-modal/change-modal.component';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';

import {HttpClientModule} from '@angular/common/http';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';

@NgModule({
  declarations: [ AppComponent, LoginComponent, 
                  SignComponent, HomeComponent, 
                  CreateModalComponent, ChangeModalComponent, DialogOverviewDialog, DialogOverviewDialog_Change],
  imports: [MatFormFieldModule, MatSlideToggleModule, 
            BrowserModule, FormsModule, 
            AppRoutingModule, BrowserAnimationsModule, 
            ReactiveFormsModule, DemoMaterialModule,
            MatDialogModule, MatToolbarModule, MatButtonModule, MatInputModule,
            HttpClientModule, MatNativeDateModule, MatRippleModule],
  exports: [MatFormFieldModule, MatSlideToggleModule, 
            BrowserModule, FormsModule, 
            AppRoutingModule, BrowserAnimationsModule, 
            ReactiveFormsModule, DemoMaterialModule,
            MatDialogModule, MatToolbarModule, MatButtonModule, MatInputModule,
            HttpClientModule, MatNativeDateModule, MatRippleModule],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent, CreateModalComponent, ChangeModalComponent]
})

export class AppModule { }
