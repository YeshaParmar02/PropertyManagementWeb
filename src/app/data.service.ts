import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Property } from './propery.model';
import { Config } from './config';
import { promise } from 'protractor';

export class RecentItems {
  id: number;
  images: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  availableProperties: Property[];
  recentlyView: RecentItems[] = [];

  constructor(private httpClient: HttpClient) { }

  getAllProperties(): Promise<Property[]> {
    const p = new Promise<Property[]>((resolve, reject) => {
      this.httpClient.get(Config.BASE_URL + 'api/properties')
        .subscribe((data: Property[]) => {
          this.availableProperties = data;
          resolve(data);
        });
    });
    return p;
  }

  addProperty(data: Property): Promise<Property> {
    const p = new Promise<Property>((resolve, reject) => {
      this.httpClient.post(Config.BASE_URL + 'api/properties', data)
        .subscribe((data: Property) => {
          resolve(data);
        });
    });
    return p;
  }

  updateViewCount(updateId: number) {
    const index = this.availableProperties.findIndex(data => data.id === updateId);
    const updatedCount = this.availableProperties[index].viewCount + 1;
    this.availableProperties[index].viewCount = updatedCount;
    const existingViewCont = {
      count: updatedCount,
      id: updateId
    };
    this.httpClient.put(Config.BASE_URL + 'api/properties/viewCount', existingViewCont)
      .subscribe((data: Property) => {
        console.log('property updated', data);
      });
  }

  updateFavItem(updateId: number) {
    const index = this.availableProperties.findIndex(data => data.id === updateId);
    const fav = this.availableProperties[index].favourite;
    this.availableProperties[index].favourite = !fav;
    const updateFavCount = {
      favourite: !fav,
      id: updateId
    };
    this.httpClient.put(Config.BASE_URL + 'api/properties/favourite', updateFavCount)
      .subscribe((data: Property) => {
        console.log('property updated', data);
      });
  }

  updateRecenViews(viewId) {
    if (this.recentlyView.filter((item) => item.id === viewId).length > 0) {
      return;
    }
    if (this.recentlyView.length >= 5) {
      this.recentlyView.shift();
    }
    const data = this.availableProperties[this.availableProperties.findIndex(item => item.id === viewId)];
    this.recentlyView.push({
      id: data.id,
      images: data.images,
      name: data.name
    });
  }

}
