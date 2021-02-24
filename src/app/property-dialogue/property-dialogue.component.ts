import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Property } from '../propery.model';

export class ViewData {
  item: Property;
  isView: boolean;
}

@Component({
  selector: 'app-property-dialogue',
  templateUrl: './property-dialogue.component.html',
  styleUrls: ['./property-dialogue.component.css']
})
export class PropertyDialogueComponent implements OnInit {

  property: Property;
  isViewMood: boolean = true;
  @ViewChild('mediaFileInput') mediaFileInput: ElementRef;
  imageUrls: any[]= [];
  lengthRestriction: boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data: ViewData,
    private dataService: DataService) {
    if (data && data.isView) {
      this.isViewMood = data.isView;
      this.property = data.item;
    } else {
      this.isViewMood = false;
    }
  }

  ngOnInit() {
    if (!this.isViewMood) {
      this.property = new Property();
    }
    this.lengthRestriction = false;
  }

  /**
   * Add new property
   */
  sendEntry() {
    this.dataService.addProperty(this.property)
      .then((data) => {

      });
  }

  /**
   * handle image uploads, file number restriction and update images
   * field of property array
   */
  handleFileInput(event) {
    this.imageUrls = [];
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      if (filesAmount > 5) {
        this.lengthRestriction = true;
        filesAmount = 5;
      }
      this.property.images = '';
      // store image path as a comma saparated string value
      const images:any = Array.from(event.target.files);
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        this.property.images += images[i].name + ',';
        reader.onload = (event: any) => {
          this.imageUrls.push(event.target.result);
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  getAllImagePath() {
    return this.property.images.split(',');
  }

}
