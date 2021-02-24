import { Component, OnInit } from '@angular/core';
import { Config } from '../config';
import { DataService } from '../data.service';
import { Property } from '../propery.model';

@Component({
  selector: 'app-recent-view',
  templateUrl: './recent-view.component.html',
  styleUrls: ['./recent-view.component.css']
})
export class RecentViewComponent implements OnInit {

  path:string = Config.DEFAULT_IMAGE_PARTH;
  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }

  getImageSrc(propery: Property) {
    if (propery.images && propery.images !== '') {
      return this.path + '/' + propery.images.split(",")[0];
    } else {
      return this.path + '/1.jpg';
    }
  }

}
