import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProfileApiService {
  constructor(private http: HttpClient) {}

  createOrUpdateProfile(profileData: any) {
    return this.http.post('/api/profile', profileData);
  }

  getProfile(userId: number) {
    return this.http.get(`/api/profile/${userId}`);
  }

  getMatchPercentage(otherUserId: number) {
    return this.http.get(`/api/profile/match/${otherUserId}`);
  }

  getAllUsers() {
    return this.http.get('/api/users'); // adjust to your API path
  }
}
