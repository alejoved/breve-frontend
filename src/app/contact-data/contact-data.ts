import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { this.form = this.formCreate(); }

  crear(){
    
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
}
