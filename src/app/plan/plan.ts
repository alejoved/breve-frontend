import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan',
  imports: [
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  templateUrl: './plan.html',
  styleUrl: './plan.css',
})
export class Plan {
  planes: Plan[];

  constructor(){
    this.planes = [];
  }
}
