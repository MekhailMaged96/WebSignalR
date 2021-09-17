import { SignalrService } from './../../services/signalr/signalr.service';
import { NotificationService } from './../../services/notification/notification.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @ViewChild('childModal', { static: false }) childModal: ModalDirective;
  errorMessage = '';  
  notification;
  constructor(private notificationService: NotificationService,private modalService: BsModalService,
   private signalrService:SignalrService) {
      this.signalrService.message$.subscribe(response => {
        this.getNotificationCount();
    });
  }  
  isExpanded = false;  
  messages;
  ngOnInit() {  

    this.getNotificationCount();  
    this.signalrService.start();
   

  }  
  
  collapse() {  
    this.isExpanded = false;  
  }  
  
  toggle() {  
    this.isExpanded = !this.isExpanded;  
  }  
  
  getNotificationCount() {  
    this.notificationService.GetNotificationCount().subscribe(  
      notification => {  
        this.notification = notification;  
      },  
      error => this.errorMessage = <any>error  
    );  
  }  
  
  getNotificationMessage() {  
    this.notificationService.GetNotificationMessage().subscribe(  
      messages => {  
        console.log(messages);
        this.messages = messages;  
      },  
      error => this.errorMessage = <any>error  
    );  
  }  
  
 
  openModal() {  
    this.getNotificationMessage();  
    this.childModal.show();
  }  
  
  closeModal() {  
   // this.modalService.close('custom-modal'); 
   this.childModal.hide(); 
  }  

}
