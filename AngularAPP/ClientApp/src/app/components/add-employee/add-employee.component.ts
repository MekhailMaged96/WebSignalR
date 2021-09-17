import { EmployeeService } from 'src/app/services/employee/employee.service';

import { Component, OnInit, OnDestroy, ElementRef, ViewChildren } from '@angular/core';  
import { FormControlName, FormGroup, FormBuilder, Validators } from '@angular/forms';  
import { Subscription } from 'rxjs';  
import { ActivatedRoute, Router } from '@angular/router';  


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})

export class AddEmployeeComponent implements OnInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];  
  pageTitle = 'Add Employee';  
  errorMessage: string;  
  employeeForm: FormGroup;  
  tranMode: string;    
  private sub: Subscription;  
  
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
    });  
  }
  saveEmployee() {  
    console.log(this.employeeForm.value);
    if (this.employeeForm.valid) {  
     
          this.employeeService.AddEmployee(this.employeeForm.value)  
            .subscribe(response => {

                console.log(response);
                this.router.navigate(['/employees']);
            },
           
             (error: any) => this.errorMessage = <any>error  
            );  
        } 
      }
  }  


