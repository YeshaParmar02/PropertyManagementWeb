import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSliderModule} from '@angular/material/slider';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
@NgModule({
    exports: [
        MatDialogModule,
        MatButtonModule,
        MatExpansionModule,
        MatSliderModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatListModule
    ]
})
export class MatMaterialModule { }