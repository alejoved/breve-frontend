import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './screens/landing-page/landing-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, LandingPageComponent],
  template: '<app-landing-page></app-landing-page>',
  styles: []
})
export class AppComponent {
  title = 'angular-breve';
}
