import { EmployeeService } from 'src/app/services/employee/employee.service';

import { Component, OnInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';  
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';  
import { Subscription } from 'rxjs';  
import { ActivatedRoute, Router } from '@angular/router';  




@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];  
  pageTitle = 'Edit Employee';  
  errorMessage: string;  
  employeeForm: FormGroup;  
  tranMode: string;    
  private sub: Subscription;  
  id;
  displayMessage: { [key: string]: string } = {};  
  private validationMessages: { [key: string]: { [key: string]: string } };  
  constructor(private employeeService:EmployeeService,private fb: FormBuilder,  
    private route: ActivatedRoute,  
    private router: Router) {

    this.validationMessages = {  
      name: {  
        required: 'Employee name is required.',  
        minlength: 'Employee name must be at least three characters.',  
        maxlength: 'Employee name cannot exceed 50 characters.'  
      },  
      cityname: {  
        required: 'Employee city name is required.',  
      }  
    };  
    
   }

  ngOnInit() {
   
    this.tranMode = "new";  
    this.employeeForm = this.fb.group({  
      name: ['', [Validators.required,  
      Validators.minLength(3),  
      Validators.maxLength(50)  
      ]],  
      address: '',  
      cityname: ['', [Validators.required]],  
      gender: '',  
      company: '',  
      designation: '',
      Id:0
    });
    
    this.sub = this.route.paramMap.subscribe(  
      params => {  
         this.id = params.get('id');  
        const cityname = params.get('cityname');  
     
         this.getEmployee(this.id);  
        
      }  
    );  
  }
  saveEmployee() {  
    console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {  
     
          this.employeeService.UpdateEmployee(this.id,this.employeeForm.value)  
            .subscribe(response => {

                console.log(response);
                this.router.navigate(['/employees']);
            },
           
             (error: any) => this.errorMessage = <any>error  
            );  
        } 
      }

      getEmployee(id: string): void {  
        this.employeeService.getEmployee(id)  
          .subscribe(  
            (response) => this.displayEmployee(response),  
            (error: any) => this.errorMessage = <any>error  
          );  
      }  
      
      displayEmployee(response): void {  
        if (this.employeeForm) {  
          this.employeeForm.reset();  
        }  
        let employee = response;  
        console.log(employee);
        this.employeeForm.patchValue({  
          name: employee.name,  
          address: employee.address,  
          gender: employee.gender,  
          company: employee.company,  
          designation: employee.designation,  
          cityname: employee.cityname ,
          Id:Number(employee.id)
      })
    } 
}
