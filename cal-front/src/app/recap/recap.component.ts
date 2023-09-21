import { Component } from '@angular/core';
import { NgChartsModule, NgChartsConfiguration } from 'ng2-charts';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent {
  public lineChartOptions: any = {
    responsive: true,
  };
  public lineChartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartType = 'line';
  public lineChartData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  ];
}

