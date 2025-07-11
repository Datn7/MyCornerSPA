import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleryApiService } from '../../services/gallery-api.service';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent implements OnInit {
  galleryItems = signal<any[]>([]);
  newImageUrl = '';
  newCaption = '';
  loading = signal(false);
  error = signal('');

  private api = inject(GalleryApiService);

  ngOnInit(): void {
    this.loadGallery();
  }

  loadGallery() {
    this.loading.set(true);
    this.api.getUserGallery(this.getCurrentUserId()).subscribe({
      next: (items: any) => {
        this.galleryItems.set(items);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Gallery load error', err);
        this.error.set('Failed to load gallery.');
        this.loading.set(false);
      },
    });
  }

  uploadImage() {
    if (!this.newImageUrl.trim()) {
      this.error.set('Image URL is required.');
      return;
    }
    this.loading.set(true);
    this.api
      .uploadGalleryItem({
        imageUrl: this.newImageUrl,
        caption: this.newCaption,
      })
      .subscribe({
        next: () => {
          this.newImageUrl = '';
          this.newCaption = '';
          this.loadGallery();
        },
        error: (err) => {
          console.error('Upload error', err);
          this.error.set('Failed to upload image.');
          this.loading.set(false);
        },
      });
  }

  deleteImage(id: number) {
    this.loading.set(true);
    this.api.deleteGalleryItem(id).subscribe({
      next: () => {
        this.loadGallery();
      },
      error: (err) => {
        console.error('Delete error', err);
        this.error.set('Failed to delete image.');
        this.loading.set(false);
      },
    });
  }

  getCurrentUserId(): number {
    // TEMPORARY, replace with actual user ID retrieval
    return 1;
  }
}
