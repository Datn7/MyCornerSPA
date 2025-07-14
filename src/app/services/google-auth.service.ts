import { Injectable } from '@angular/core';
import {
  SocialAuthService,
  GoogleLoginProvider,
  SocialUser,
} from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = signal<SocialUser | null>(null);
  jwtToken = signal<string | null>(null);

  constructor(
    private socialAuthService: SocialAuthService,
    private http: HttpClient
  ) {}

  initGoogleLogin() {
    this.socialAuthService.initState.subscribe({
      next: () => console.log('Google Auth SDK initialized'),
      error: (err) => console.error('Google Auth SDK error', err),
    });

    this.socialAuthService.authState.subscribe((user) => {
      this.user.set(user);
      if (user) {
        this.sendTokenToBackend(user.idToken);
      }
    });
  }

  signInWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signOut() {
    this.socialAuthService.signOut();
    this.user.set(null);
    this.jwtToken.set(null);
    localStorage.removeItem('jwt');
  }

  private sendTokenToBackend(idToken: string) {
    this.http
      .post<{ token: string }>('/api/auth/google-login', { idToken })
      .subscribe({
        next: (res) => {
          localStorage.setItem('jwt', res.token);
          this.jwtToken.set(res.token);
          console.log('Logged in with backend');
        },
        error: (err) => console.error('Backend login error', err),
      });
  }
}
