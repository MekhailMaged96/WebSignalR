import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {

  private connection: signalR.HubConnection;
  private message = new Subject<any>();

  message$ = this.message.asObservable();

  constructor() {

     this.connection = new signalR.HubConnectionBuilder()  
    .configureLogging(signalR.LogLevel.Information)  
    .withUrl(environment.notificationUrl + 'notify')  
    .build();  
   }

  

   start(){
    this.connection.start().then(function () {  
      console.log('SignalR Connected!');  
    }).catch(function (err) {  
      return console.error(err.toString());  
    });  
    this.connection.on("BroadcastMessage", (data) => {  
        this.message.next(data);
    }); 
   }
  

}
