import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CallToActionSectionComponent } from '../call-to-action-section/call-to-action-section.component';
import { MainContentSectionComponent } from '../main-content-section/main-content-section.component';
import { FeaturesSectionComponent } from '../features-section/features-section.component';
import { PricingSectionComponent } from '../pricing-section/pricing-section.component';
import { UserReviewsSectionComponent } from '../user-reviews-section/user-reviews-section.component';
import { FaqSectionComponent } from '../faq-section/faq-section.component';
import { TestimonialsSectionComponent } from '../testimonials-section/testimonials-section.component';
import { HeroSectionComponent } from '../hero-section/hero-section.component';
import { AppOverviewSectionComponent } from '../app-overview-section/app-overview-section.component';
import { NavigationSectionComponent } from '../navigation-section/navigation-section.component';

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
    FaqSectionComponent,
    TestimonialsSectionComponent,
    HeroSectionComponent,
    AppOverviewSectionComponent,
    NavigationSectionComponent
  ],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {}
