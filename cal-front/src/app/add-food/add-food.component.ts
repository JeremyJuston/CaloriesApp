import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Observable, map, startWith } from 'rxjs';
import { DatePipe } from '@angular/common';

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

  constructor(private http: HttpClient, private datePipe: DatePipe) {
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
    const date = this.foodForm.controls['date'].value;
    const foodType = this.foodForm.controls['foodType'].value;
    const foodQty = this.foodForm.controls['foodQty'].value;

    if (foodType != '' && foodType != null &&
        foodQty != '' && foodQty != null &&
        date != '' && date != null) {

      const formattedDate = this.datePipe.transform(date, 'dd/MM/yy');
      console.log(formattedDate);

      const food = [formattedDate, foodType, foodQty];

      fetch('/add_food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ food }),
      })

    }
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