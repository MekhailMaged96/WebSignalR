import { Component, OnInit } from '@angular/core';
import { SignalrService } from './services/signalr/signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ClientApp';

  constructor( private signalrService:SignalrService){

  }
  ngOnInit(): void {
    this.signalrService.start();
  }


}
