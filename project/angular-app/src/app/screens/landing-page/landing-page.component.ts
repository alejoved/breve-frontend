import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallToActionSectionComponent } from './sections/call-to-action-section/call-to-action-section.component';
import { MainContentSectionComponent } from './sections/main-content-section/main-content-section.component';
import { FeaturesSectionComponent } from './sections/features-section/features-section.component';
import { PricingSectionComponent } from './sections/pricing-section/pricing-section.component';
import { UserReviewsSectionComponent } from './sections/user-reviews-section/user-reviews-section.component';
import { FAQSectionComponent } from './sections/faq-section/faq-section.component';
import { TestimonialsSectionComponent } from './sections/testimonials-section/testimonials-section.component';
import { HeroSectionComponent } from './sections/hero-section/hero-section.component';
import { AppOverviewSectionComponent } from './sections/app-overview-section/app-overview-section.component';
import { NavigationSectionComponent } from './sections/navigation-section/navigation-section.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    CallToActionSectionComponent,
    MainContentSectionComponent,
    FeaturesSectionComponent,
    PricingSectionComponent,
    UserReviewsSectionComponent,
    FAQSectionComponent,
    TestimonialsSectionComponent,
    HeroSectionComponent,
    AppOverviewSectionComponent,
    NavigationSectionComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {}
