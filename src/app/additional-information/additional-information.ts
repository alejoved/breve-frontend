import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CustomerService } from '../service/customer-service';
import Swal from 'sweetalert2';
import { error_swal } from '../../constants';

@Component({
  selector: 'app-additional-information',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './additional-information.html',
  styleUrl: './additional-information.css',
})
export class AdditionalInformation {

  form: FormGroup;
  companyId: string | undefined;
  customerId : string | undefined;
  planId : string | undefined;

  documentTypes = [
    { value: 'CC', viewValue: 'Cédula de Ciudadanía' },
    { value: 'TI', viewValue: 'Tarjeta de Identidad' },
    { value: 'CE', viewValue: 'Cédula de Extranjería' },
    { value: 'PA', viewValue: 'Pasaporte' }
  ];

  genres = [
    { value: 'M', viewValue: 'Masculino' },
    { value: 'F', viewValue: 'Femenino' },
  ];

  constructor(private fb: FormBuilder, private router: Router, private CustomerService: CustomerService){
    this.form = this.formCreate(); 
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state) {
      this.companyId = state['company'].id;
      this.customerId = state['customer'].id;
    }
    if(!state){
      this.router.navigate(['']);
    }
  }

  ngOnInit(): void {
    this.filterById();
  }

  async filterById(){
    try {
      const customer = await this.CustomerService.filterById(this.customerId!);
      this.formUpdate(this.form, customer);
    } catch (ex: any){
      Swal.fire({ icon: error_swal, title: ex.error.mensaje, text: ex.error.datos, footer: ex.error.codigo });
    }
  }

  formCreate(): FormGroup {
    return this.fb.group({
        id : [0],
        genre: ["", [Validators.required]],
        documentType: ["", [Validators.required]],
        documentNumber: ["", [Validators.required]],
    });
  }

    formReset(form: FormGroup){
      form.reset({
          id : 0,
          genre: "",
          documentType: "",
          documentNumber: "",
      });
    }

    formUpdate(form: FormGroup, data: any){
      form.patchValue({
          id : data.id,
          genre: data.genre,
          documentType: data.documentType,
          documentNumber: data.documentNumber,
      });
    }

    async continue(){
      try {
        const payload = this.form.getRawValue();
        const customer = await this.CustomerService.update(payload);
        this.router.navigate(['/additional-information'], { state: { company: { id: this.companyId }, customer: {id: customer.id }, plan: {id: this.planId}}});
      } catch (ex: any){
        Swal.fire({ icon: error_swal, title: ex.error.mensaje, text: ex.error.datos, footer: ex.error.codigo });
      }
    }
}
