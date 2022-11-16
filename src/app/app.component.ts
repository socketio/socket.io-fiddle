import { Component } from '@angular/core';
import * as io from "socket.io-client";

const socket = io();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tmp';
}
