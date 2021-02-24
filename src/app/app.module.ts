import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from './data.service';
import { PropertyDialogueComponent } from './property-dialogue/property-dialogue.component';
import { PropertyListComponent } from './property-list/property-list.component';
import { MatMaterialModule } from './mat-material.module';
import {DatePipe} from '@angular/common';
import { RecentViewComponent } from './recent-view/recent-view.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';

@NgModule({
  declarations: [
    AppComponent,
    PropertyDialogueComponent,
    PropertyListComponent,
    RecentViewComponent,
    ImageCarouselComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMaterialModule
  ],
  providers: [DataService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
