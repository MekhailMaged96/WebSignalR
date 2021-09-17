import { SignalrService } from './../../services/signalr/signalr.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import * as signalR from '@microsoft/signalr';  
import { environment } from 'src/environments/environment';  
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  pageTitle = 'Employee List';  

  employees;
  errorMessage = '';  
  
  constructor(private employeeService: EmployeeService,private signalrService:SignalrService) { 


    this.signalrService.message$.subscribe(response =>{
      this.getEmployeeData(); 
    });
  }  
  

  
  ngOnInit(): void {  
  this.getEmployeeData();  
  this.signalrService.start();
   
  }  
  
  getEmployeeData() {  
    this.employeeService.getEmployees().subscribe(  
      response => {  
          console.log(response);
        this.employees = response;  
      },  
      error =>{

      } 
    );  
  }  
  
  deleteEmployee(id: string, name: string): void {  
    if (id === '') {  
      this.onSaveComplete();  
    } else {  
      if (confirm(`Are you sure want to delete this Employee: ${name}?`)) {  
        this.employeeService.DeleteEmployee(id)  
          .subscribe(  
            () => this.onSaveComplete(),  
            (error: any) => this.errorMessage = <any>error  
          );  
      }  
    }  
  }  
  
  onSaveComplete(): void {  
    this.employeeService.getEmployees().subscribe(  
      employees => {  
        this.employees = employees;  
      },  
      error => this.errorMessage = <any>error  
    );  
  }  

}
