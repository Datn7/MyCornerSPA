import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class GalleryApiService {
  constructor(private http: HttpClient) {}

  uploadGalleryItem(itemData: any) {
    return this.http.post('/api/gallery', itemData);
  }

  getUserGallery(userId: number) {
    return this.http.get(`/api/gallery/user/${userId}`);
  }

  deleteGalleryItem(itemId: number) {
    return this.http.delete(`/api/gallery/${itemId}`);
  }
}
