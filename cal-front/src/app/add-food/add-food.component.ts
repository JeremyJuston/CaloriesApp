import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import * as Papa from 'papaparse';
import { Observable, map, startWith } from 'rxjs';

@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.scss']
})
export class AddFoodComponent {

  foodForm: FormGroup;
  
  foods: Food[] = [];
  foodsListCsv: string = '../../assets/tables/foodsList.csv';
  userArray: any;

  filteredFoods!: Observable<Food[]>;

  constructor(private http: HttpClient) {
    this.foodForm = new FormGroup({
      date: new FormControl<string>('', Validators.required),
      foodType: new FormControl<string>('', Validators.required),
      foodQty: new FormControl(null, Validators.required)
    });

  }
  
  ngOnInit() {
    this.getFoods();

    this.filteredFoods = this.foodForm.controls['foodType'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterFood(value)),
    );

    
  }

  public filterFoods() {
    this.filteredFoods = this.foodForm.controls['foodType'].valueChanges.pipe(
      startWith(''),
      map(value => this.filterFood(value)),
    );
    console.log(this.filteredFoods);
    console.log('-----------------------');
  }

  private filterFood(value: string): Food[] {
    console.log(this.foods.filter(option => option.name.toLowerCase().startsWith(value.toLowerCase())));
    console.log('VALUE : ', value);
    return this.foods.filter(option => option.name.toLowerCase().includes(value.toLowerCase()));
  }
  
  getFoods() {
    this.http.get('/loading/foods').subscribe((data: any) => {
      
      for (let index = 1; index < data.length; index++){
        this.foods.push(new Food(data[index][0], 
          parseFloat(data[index][1]), parseFloat(data[index][2]), parseFloat(data[index][3])))
      }
      
      console.log(this.foods);
    })
  };

  addFood() {

  }
}

export class Food{
  name: String;
  lip: number;
  glu: number;
  pro: number;

  constructor(name: String, lip: number, glu: number, pro: number){
    this.name = name;
    this.lip = lip;
    this.glu = glu;
    this.pro = pro;
  }
}