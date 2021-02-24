import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from './data.service';
import { Property } from './propery.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Prime Properties';

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
