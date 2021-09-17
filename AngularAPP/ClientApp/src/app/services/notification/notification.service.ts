import { Injectable } from '@angular/core';
import { DataService } from '../http/data.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private dataService:DataService) { 

  }

  GetNotificationCount(){
    return this.dataService.get('/Notification/GetNotificationCount',"application/json")
  }

  GetNotificationMessage(){
    return this.dataService.get('/Notification/GetNotificationMessage',"application/json")
  }
}
