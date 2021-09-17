import { HomeComponent } from './components/home/home.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [

  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'employees/add', component: AddEmployeeComponent},
  {  
    path: 'employees/:id/edit',  
    component: EditEmployeeComponent  
  },
  {  
    path: 'employees',  
    component: EmployeeListComponent  
  },
  {
    path:'**',component:HomeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
