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
  businessNick: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const nickFromParam = params.get('businessNick');
      if (nickFromParam) {
        this.businessNick = nickFromParam;
      } else {
        this.router.navigate(['']);
      }
    });
    setTimeout(() => {
      this.router.navigate(['/contact'], { state: { businessNick: this.businessNick } });
    }, 2500);
  }
}
