import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FileService } from './file.service';
import { UniqueFileNameValidator } from './unique.validator';

@NgModule({
  imports: [BrowserModule, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent, UniqueFileNameValidator],
  providers: [FileService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
