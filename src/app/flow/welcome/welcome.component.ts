import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  businessName: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nameFromParam = params.get('businessName');
      if (nameFromParam) {
        this.businessName = nameFromParam;
      } else {
        this.router.navigate(['']);
      }
    });
    setTimeout(() => {
      this.router.navigate(['/contact'], { state: { businessName: this.businessName } });
    }, 2500);
  }
}
