import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Company } from '../../models/company';

@Component({
  selector: 'app-bank-account-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bank-account-view.component.html',
  styleUrls: ['./bank-account-view.component.css']
})
export class BankAccountViewComponent implements OnInit {
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
    bank_name: '',
    account_type: '',
    account_number: '',
    swift_bic: '',
    owner_name: ''
  };

  errors = {
    bank_name: '',
    account_number: '',
    owner_name: ''
  };

  touched = {
    bank_name: false,
    account_number: false,
    owner_name: false
  };

  constructor() {}

  async ngOnInit() {
    await this.loadData();
  }

  async loadData() {
    this.loading = true;
    const business = new Company();
    if (business) {
      this.formData = {
        bank_name: business.bank_name || '',
        account_type: business.account_type || '',
        account_number: business.account_number || '',
        swift_bic: business.swift_bic || '',
        owner_name: business.owner_name || ''
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
    this.validateOwnerName();
  }

  validateBankName() {
    if (this.touched.bank_name) {
      if (!this.formData.bank_name) {
        this.errors.bank_name = 'Debes seleccionar un banco';
      } else {
        this.errors.bank_name = '';
      }
    }
  }

  validateAccountNumber() {
    if (this.touched.account_number) {
      const accountNumber = this.formData.account_number.trim();

      if (!accountNumber) {
        this.errors.account_number = 'El número de cuenta es requerido';
      } else if (!/^\d+$/.test(accountNumber)) {
        this.errors.account_number = 'El número de cuenta solo debe contener dígitos';
      } else if (accountNumber.length < 9 || accountNumber.length > 20) {
        this.errors.account_number = 'El número de cuenta debe tener entre 9 y 20 dígitos';
      } else {
        this.errors.account_number = '';
      }
    }
  }

  validateOwnerName() {
    if (this.touched.owner_name) {
      if (!this.formData.owner_name.trim()) {
        this.errors.owner_name = 'El nombre del titular es requerido';
      } else if (this.formData.owner_name.trim().length < 2) {
        this.errors.owner_name = 'El nombre debe tener al menos 2 caracteres';
      } else {
        this.errors.owner_name = '';
      }
    }
  }

  isFormValid(): boolean {
    return !this.errors.bank_name &&
           !this.errors.account_number &&
           !this.errors.owner_name &&
           this.formData.bank_name.trim() !== '' &&
           this.formData.account_number.trim() !== '' &&
           this.formData.owner_name.trim() !== '';
  }

  onFieldBlur(field: keyof typeof this.touched) {
    this.touched[field] = true;
    switch(field) {
      case 'bank_name': this.validateBankName(); break;
      case 'account_number': this.validateAccountNumber(); break;
      case 'owner_name': this.validateOwnerName(); break;
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
