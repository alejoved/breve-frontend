import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Company } from '../model/company';
import { CompanyService } from '../service/company-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    FormsModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  companies: Company[];
  companyId: string | undefined;
  constructor(private companyService: CompanyService, private router: Router){
    this.companies = [];
    this.companyId = undefined;
    this.getAll();
    
  }

  async getAll(){
    this.companies = await this.companyService.getAll();
  }

  continue(){
    this.router.navigate(['/contact-data'], {
    state: { company: { id: this.companyId } }
  });
  }
}
