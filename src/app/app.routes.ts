import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { ProfileComponent } from './features/profile/profile.component';
import { DiscoverComponent } from './features/discover/discover.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { MessagesComponent } from './features/messages/messages.component';

export const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'profile', component: ProfileComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'messages', component: MessagesComponent },
  { path: 'discover', component: DiscoverComponent },
  { path: 'login', component: LoginComponent },
];
