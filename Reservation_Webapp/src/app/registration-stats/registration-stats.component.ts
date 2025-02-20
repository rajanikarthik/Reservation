import { Component, OnInit } from '@angular/core';
import { NgbModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms'
//import {BrowserModule} from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationServiceService } from '../Util/registration-service.service'
import { CommonModule } from '@angular/common';
//import { NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { error } from 'console';
import { HttpParams } from '@angular/common/http';

interface Map {
  [key: string]: string | undefined
}

interface Registration {
  id: number,
  betriebId: string,
  status: string,
  gastId: number,
  peopleCount: number,
  msg: string,
  notes: string,
  tags: string,
  reservedFor: string,
  shiftId: number,
  roomId: number,
  stayTime: number,
  userPerSmsInform: string,
  isTablePlan: string,
  feedbackHash: string,
  feedbackSent: string,
  addOns: string,
  orderId: number,
  hash: string,
  locked: number,
  paymentTemplate: number,
  paymentId: number,
  invoice: number,
  recurrenceId: number,
  source: string,
  turnover: number,
  children: number,
  highChairs: number,
  resHotelID: number,
  referrer: string
}

@Component({
  selector: 'app-registration-stats',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, NgbPaginationModule
  ],
  templateUrl: './registration-stats.component.html',
  styleUrl: './registration-stats.component.css'
})


export class RegistrationStatsComponent implements OnInit {
  registrations: Registration[] = []
  searchRegistration: Registration[]=[]
  searchObj: Map ={} ;
  reportData: any = [];
  currentPage = 1;
  pageSize = 10;

  constructor(private RegistrationService: RegistrationServiceService) { }
  ngOnInit(): void {
   this.showAPIdata()
  }

  showAPIdata(){
   
    let params = new HttpParams();
    params = params.append('page', this.currentPage);

    this.RegistrationService.GetAllRegistration(params).subscribe(res => {
       this.registrations =<Registration[]> res
      this.searchRegistration=<Registration[]>res
 
     }, (error)=>{
      console.log(error)
     }
    )

  }
  
  

  searchInterface(searchStrevent: string, mode:string, field:string) {
    let searchStr = searchStrevent.toLowerCase();

    var deptKey = Object.keys(this.searchRegistration);
    var exist = false;
    this.searchObj[field] = searchStr;
    var tempKeyArr = [];
    var evalString = "";
    var testObj = this.searchObj;
    for (let key in this.searchObj) {
      if (key.length != 0) tempKeyArr.push(key);
    }
    for (let i = 0; i < tempKeyArr.length; i++) {
      if (tempKeyArr[i].length != 0 && i != tempKeyArr.length - 1) {
        evalString =
          evalString +
          "(String(obj['" +
          tempKeyArr[i] +
          "']).toLowerCase().indexOf(testObj['" +
          tempKeyArr[i] +
          "']) > -1 )" +
          " && ";
      }
      if (tempKeyArr[i].length != 0 && i == tempKeyArr.length - 1) {
        evalString =
          evalString +
          "(String(obj['" +
          tempKeyArr[i] +
          "']).toLowerCase().indexOf(testObj['" +
          tempKeyArr[i] +
          "']) > -1 )";
      }
    }
    this.registrations = this.searchRegistration.filter((obj) => {
      return eval(evalString);
    }); 
  }
}
