import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer-service';
import { Customer } from '../model/customer';
import { error, error_falta_datos, error_swal } from '../../constants';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-data',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule
  ],
  templateUrl: './contact-data.html',
  styleUrl: './contact-data.css',
})
export class ContactData {
  form: FormGroup;
  companyId: string | undefined;
  customer: Customer | undefined;

  constructor(private fb: FormBuilder, private router: Router, private customerService: CustomerService) { 
    this.form = this.formCreate(); 
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.companyId = state['company'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
  }

  formCreate(): FormGroup {
    return this.fb.group({
        id : [0],
        name: ["", [Validators.required]],
        lastname: ["", [Validators.required]],
        email: ["", [Validators.required]],
    });
  }

    formReset(form: FormGroup){
      form.reset({
          id : 0,
          name: "",
          lastname: "",
          email: "",
      });
    }

    formUpdate(form: FormGroup, data: any){
      form.patchValue({
          id : data.id,
          name: data.name,
          lastname: data.lastname,
          email: data.email,
      });
    }

    async continue(){
      if (this.form.invalid) {
        Swal.fire({ icon: error_swal, title: error, text: error_falta_datos });
        return;
      }
      try {
        const payload = this.form.getRawValue();
        this.customer = await this.customerService.crear(payload);
        if(this.customer){
          this.router.navigate(['/plan-selection'], { state: { company: { id: this.companyId }, customer: {id: this.customer.id } }});
        }
      } catch (ex: any){
        console.log(ex);
        Swal.fire({ icon: error_swal, title: ex.name, text: ex.error, footer: ex.error.codigo });
      }
    }
}
