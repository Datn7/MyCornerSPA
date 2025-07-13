import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-preview.component.html',
  styleUrls: ['./profile-preview.component.scss'],
})
export class ProfilePreviewComponent {
  @Input() aboutMe = '';
  @Input() interests: string = '';
  @Input() reactionsJson: string = '';
  @Input() profilePictureUrl = '';
  @Input() coverPhotoUrl = '';
  readonly objectKeys = Object.keys;

  get interestList(): string[] {
    return this.interests
      .split(',')
      .map((i) => i.trim())
      .filter(Boolean);
  }

  get reactions(): any {
    try {
      return JSON.parse(this.reactionsJson);
    } catch {
      return {};
    }
  }
}
