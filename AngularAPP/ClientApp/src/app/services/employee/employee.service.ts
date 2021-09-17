import { DataService } from './../http/data.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private dataService:DataService) { 

  }

  getEmployees(){
    return this.dataService.get("/Employee/GetEmployees","application/json" );
  }

  getEmployee(id){
    return this.dataService.get("/Employee/"+id,"application/json" );
  }

  AddEmployee(data){
    return this.dataService.Create("/Employee",data,"application/json" );
  }

  UpdateEmployee(id,data){
    return this.dataService.Update("/Employee/"+id,data,"application/json" );
  }

  DeleteEmployee(id){
    return this.dataService.Delete("/Employee/"+id,"application/json" );
  }

}


