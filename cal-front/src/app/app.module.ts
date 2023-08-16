import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddFoodComponent } from './add-food/add-food.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatOptionModule } from '@angular/material/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { RecapComponent } from './recap/recap.component';

const appDateFormat = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
  }
};

@NgModule({
  declarations: [
    AppComponent,
    AddFoodComponent,
    RecapComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatOptionModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MatDatepickerModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: appDateFormat
    },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'fr'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
