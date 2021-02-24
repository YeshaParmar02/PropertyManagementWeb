import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Config } from '../config';
import { DataService } from '../data.service';
import { PropertyDialogueComponent } from '../property-dialogue/property-dialogue.component';
import { Property } from '../propery.model';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {

  path: string = Config.DEFAULT_IMAGE_PARTH;
  searchProperty: Property;
  propertyList: Property[] = [];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(public dataService: DataService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.searchProperty = new Property;
    this.loadData();
  }

  loadData() {
    this.dataService.getAllProperties()
      .then((data) => {
        this.propertyList = data;
      });
  }

  /**
   * Open add property dialogue
   */
  openDialog() {
    const dialogRef = this.dialog.open(PropertyDialogueComponent);
    dialogRef.afterClosed().subscribe(result => {
      this.loadData();
    });
  }

  viewDialog(viewId) {
    this.dataService.updateViewCount(viewId);
    this.dataService.updateRecenViews(viewId);
    const dialogRef = this.dialog.open(PropertyDialogueComponent, {
      data: {
        item: this.dataService.availableProperties.filter(data => data.id === viewId)[0],
        isView: true
      }
    });
  }

  updateFav(updateId) {
    this.dataService.updateFavItem(updateId);
  }

  searchData() {
    this.propertyList = this.dataService.availableProperties.filter((data) => this.compareFilter(data, this.searchProperty));
  }

  /**
   * Custom filter used to search data base on comparision
   */
  compareFilter(data: Property, search: Property) {
    let isMatched = true;
    let startDate;
    let endDate;
    if (this.range && this.range.value && this.range.value.start && this.range.value.end) {
      startDate = new Date(this.range.value.start).toISOString().replace('T', ' ').split('.')[0];
      endDate = new Date(this.range.value.end).toISOString().replace('T', ' ').split('.')[0];
      search.entryDate = new Date();
    }
    Object.keys(search).forEach((key) => {
      if ((key === 'price' && search[key] < data[key]) ||
        (key === 'entryDate' && startDate > data[key] && endDate < data[key]) ||
        (key !== 'price' && search[key] !== data[key])) {
        isMatched = false;
      }
    });
    return isMatched;
  }

  clearSearch() {
    this.searchProperty = new Property();
    this.propertyList = this.dataService.availableProperties;
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 100000) + 'l';
    }
    return value;
  }

  /**
   * In case property has any value strored as image then display the first value
   * else display the defalut image
   */
  getImageSrc(propery: Property) {
    if (propery.images && propery.images !== '') {
      return this.path + '/' + propery.images.split(",")[0];
    } else {
      return this.path + '/1.jpg';
    }
  }

}
