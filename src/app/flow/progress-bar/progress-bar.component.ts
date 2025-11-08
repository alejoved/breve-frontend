import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="progress-container">
      <div class="progress-bar">
        <div
          *ngFor="let step of steps; let i = index"
          class="progress-segment"
          [class.active]="i < currentStep"
        ></div>
      </div>
    </div>
  `,
  styles: [`
    .progress-container {
      padding: 0 0 24px 0;
    }

    .progress-bar {
      display: flex;
      gap: 8px;
      width: 100%;
    }

    .progress-segment {
      flex: 1;
      height: 8px;
      background: #e5e7eb;
      border-radius: 4px;
      transition: background 0.3s ease;
    }

    .progress-segment.active {
      background: #845EEE;
    }

    @media (max-width: 768px) {
      .progress-container {
        padding: 0 0 20px 0;
      }

      .progress-segment {
        height: 6px;
      }
    }
  `]
})
export class ProgressBarComponent {
  @Input() currentStep = 1;
  @Input() totalSteps = 6;

  get steps() {
    return Array(this.totalSteps).fill(0);
  }
}
