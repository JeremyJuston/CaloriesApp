import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFoodComponent } from './add-food/add-food.component';
import { RecapComponent } from './recap/recap.component';

const routes: Routes = [
  {path:'add-food', component: AddFoodComponent},
  {path: 'recap', component: RecapComponent	}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
