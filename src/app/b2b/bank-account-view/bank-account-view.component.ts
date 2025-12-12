import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Business } from '../../models/business';
import { BusinessService } from '../../services/business-service';
import Swal from 'sweetalert2';
import { AuthB2BService } from '../../auth/auth-b2b-service';

@Component({
  selector: 'app-bank-account-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-account-view.component.html',
  styleUrls: ['./bank-account-view.component.css']
})
export class BankAccountViewComponent implements OnInit {
  business: Business | null = null;
  loading = true;
  saving = false;

  colombianBanks = [
    'Bancolombia',
    'Banco de Bogotá',
    'Davivienda',
    'BBVA Colombia',
    'Banco de Occidente',
    'Banco Popular',
    'Banco Caja Social',
    'Banco AV Villas',
    'Banco Agrario',
    'Banco GNB Sudameris',
    'Banco Pichincha',
    'Banco Cooperativo Coopcentral',
    'Banco Falabella',
    'Banco Finandina',
    'Banco Mundo Mujer',
    'Banco W',
    'Banco Serfinanza',
    'Bancamía',
    'Nequi',
    'Daviplata'
  ];

  formData = {
    id: '',
    bankName: '',
    accountType: '',
    accountNumber: '',
    accountOwner: '',
    identificationType: '',
    identificationNumber: ''
  };

  errors = {
    bankName: '',
    accountNumber: '',
    accountType: '',
    accountOwner: '',
    identificationType: "",
    identificationNumber: ""
  };

  touched = {
    bankName: false,
    accountNumber: false,
    accountOwner: false,
    identificationType: false,
    identificationNumber: false
  };

  constructor(private businessService: BusinessService, private authB2B: AuthB2BService ) {
  }

  async ngOnInit() { 
    const businessId = this.authB2B.getBusinessId();
    this.business = await this.businessService.filterById(businessId!);
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    if (this.business) {
      this.formData = {
        id: this.business.id || '',
        bankName: this.business.bankName || '',
        accountType: this.business.accountType || '',
        accountNumber: this.business.accountNumber || '',
        accountOwner: this.business.accountOwner || '',
        identificationType: this.business.identificationType || '',
        identificationNumber: this.business.identificationNumber || ''
      };
    }
    this.loading = false;
  }

  async save() {
    this.markAllTouched();
    this.validateAll();
    if (!this.isFormValid()) {
      return;
    }
    this.saving = true;
    try {
      this.business = await this.businessService.updateFinancial(this.formData);
      Swal.fire({ icon: "success", title: "Éxito", text: "La informacion de la cuenta bancaria se ha guardado correctamente." });
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: ex.error.message});
    }
    this.saving = false;
  }

  goBack() {
    window.history.back();
  }

  markAllTouched() {
    Object.keys(this.touched).forEach(key => {
      (this.touched as any)[key] = true;
    });
  }

  validateAll() {
    this.validateBankName();
    this.validateAccountNumber();
    this.validateAccountOwner();
    this.validateIdentificationType();
    this.validateIdentificationNumber();
  }

  validateBankName() {
    if (this.touched.bankName) {
      if (!this.formData.bankName) {
        this.errors.bankName = 'Debes seleccionar un banco';
      } else {
        this.errors.bankName = '';
      }
    }
  }

  validateAccountNumber() {
    if (this.touched.accountNumber) {
      const accountNumber = this.formData.accountNumber.trim();

      if (!accountNumber) {
        this.errors.accountNumber = 'El número de cuenta es requerido';
      } else if (!/^\d+$/.test(accountNumber)) {
        this.errors.accountNumber = 'El número de cuenta solo debe contener dígitos';
      } else if (accountNumber.length < 9 || accountNumber.length > 20) {
        this.errors.accountNumber = 'El número de cuenta debe tener entre 9 y 20 dígitos';
      } else {
        this.errors.accountNumber = '';
      }
    }
  }

  validateAccountOwner() {
    if (this.touched.accountOwner) {
      if (!this.formData.accountOwner.trim()) {
        this.errors.accountOwner = 'El nombre del titular es requerido';
      } else if (this.formData.accountOwner.trim().length < 2) {
        this.errors.accountOwner = 'El nombre debe tener al menos 2 caracteres';
      } else {
        this.errors.accountOwner = '';
      }
    }
  }

  validateIdentificationType() {
    if (this.touched.identificationType) {
      if (!this.formData.identificationType) {
        this.errors.identificationType = 'Debes seleccionar un tipo de identificación';
      } else {
        this.errors.identificationType = '';
      }
    }
  }

  validateIdentificationNumber() {
    if (this.touched.identificationNumber) {
      if (!this.formData.identificationNumber) {
        this.errors.identificationNumber = 'Debes digitar un numero de identificación';
      } else {
        this.errors.identificationNumber = '';
      }
    }
  }

  isFormValid(): boolean {
    return !this.errors.bankName &&
           !this.errors.accountNumber &&
           !this.errors.accountOwner &&
           !this.errors.identificationType &&
           !this.errors.identificationNumber &&
           this.formData.bankName.trim() !== '' &&
           this.formData.accountNumber.trim() !== '' &&
           this.formData.accountOwner.trim() !== '' &&
           this.formData.identificationType.trim() !== '' &&
           this.formData.identificationNumber.trim() !== '';
  }

  onFieldBlur(field: keyof typeof this.touched) {
    this.touched[field] = true;
    switch(field) {
      case 'bankName': this.validateBankName(); break;
      case 'accountNumber': this.validateAccountNumber(); break;
      case 'accountOwner': this.validateAccountOwner(); break;
      case 'identificationType': this.validateIdentificationType(); break;
      case 'identificationNumber': this.validateIdentificationNumber(); break;
    }
  }

  onlyNumbers(event: KeyboardEvent): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    }
    return true;
  }
}
