import { Component, inject } from '@angular/core';
import { GoogleChartsModule, ChartType } from 'angular-google-charts';
import { NgbDatepicker, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { HttpEvent } from '@angular/common/http';
import { RegistrationServiceService } from '../../Util/registration-service.service'
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [GoogleChartsModule, NgbDatepicker],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {
  calendar = inject(NgbCalendar);

  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.fromDate, 'd', 10);

  

  // Group chart
  GBtitle = 'Registration Statistics';
  GBtype = ChartType.Bar;
  /*GBdata = [
    ["2012", 900, 390],
    ["2013", 1000, 400],
    ["2014", 1170, 440],
    ["2015", 1250, 480],
    ["2016", 1530, 540]
  ];
  GBcolumnNames = ['Year', 'Asia', 'Europe'];*/
  GBdata = [
    ["4", 900],
    ["5", 1000],
    ["6", 1170],
    ["7", 1250],
    ["8", 1530]
  ];
  GBcolumnNames = ['Weekday', 'Reservation Count'];

  GBoptions = {
    hAxis: {
      title: 'Reservation'
    },
    vAxis: {
      minValue: 0
    }
  };
  GBwidth = 550;
  GBheight = 400;

  constructor(private registerService: RegistrationServiceService) {
  }

  onDateSelection(date: NgbDate) {
    let year, month, day, from_dt = '', to_dt = '';

    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
    if (this.fromDate) {
      year = this.fromDate.year
      if (this.fromDate.month < 10)
        month = "0" + this.fromDate.month
      else
        month = this.fromDate.month
      if (this.fromDate.day < 10)
        day = "0" + this.fromDate.day
      else
        day = this.fromDate.day

      from_dt = year + "-" + month + "-" + day
      console.log("from_dt: " + from_dt)
    }

    if (this.toDate) {
      year = this.toDate.year
      if (this.toDate.month < 10)
        month = "0" + this.toDate.month
      else
        month = this.toDate.month
      if (this.toDate.day < 10)
        day = "0" + this.toDate.day
      else
        day = this.toDate.day

      to_dt = year + "-" + month + "-" + day
      console.log("to_dt: " + to_dt)
    }

    if (this.fromDate && this.toDate) {
      let params = new HttpParams();
      params = params.append('fromdt', from_dt);
      params = params.append('todt', to_dt);

      this.registerService.GetRegistrationStats(params).subscribe(res => {
        console.log(res)
  //      if(res)
    //      this.GBdata.push([res.cnt, res.weekday])
        
      })
    }

  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }
}
