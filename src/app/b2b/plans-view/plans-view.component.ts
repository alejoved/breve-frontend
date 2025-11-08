import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../models/plan';

@Component({
  selector: 'app-plans-view',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plans-view.component.html',
  styleUrls: ['./plans-view.component.css']
})
export class PlansViewComponent implements OnInit {
  @Input() openCreateForm = false;
  plans: Plan[] = [];
  loading = true;
  showCreateView = false;
  editingPlan: Plan | null = null;
  showDeleteConfirm = false;
  planToDelete: Plan | null = null;

  formData = {
    name: '',
    price: 0,
    description: '',
    type: 'monthly' as 'monthly' | 'yearly',
    features: [] as string[],
    active: true
  };

  errors = {
    name: '',
    price: '',
    description: ''
  };

  touched = {
    name: false,
    price: false,
    description: false
  };

  newFeature = '';

  constructor() {}

  async ngOnInit() {
    await this.loadPlans();
    if (this.openCreateForm) {
      this.openCreateView();
    }
  }

  async loadPlans() {
    this.loading = true;
    this.plans = [];
    this.loading = false;
  }

  openCreateView() {
    this.editingPlan = null;
    this.formData = {
      name: '',
      price: 0,
      description: '',
      type: 'monthly',
      features: [],
      active: true
    };
    this.newFeature = '';
    this.showCreateView = true;
  }

  openEditView(plan: Plan) {
    this.editingPlan = plan;
    this.formData = {
      name: plan.name!,
      price: plan.price!,
      description: plan.description!,
      type: plan.type! as 'monthly' | 'yearly',
      features: [...(plan.features || [])],
      active: plan.active === 'true'
    };
    this.newFeature = '';
    this.showCreateView = true;
  }

  closeCreateView() {
    this.showCreateView = false;
    this.editingPlan = null;
  }

  async savePlan() {
    this.markAllTouched();
    this.validateAll();

    if (!this.isFormValid()) {
      return;
    }

    //if (this.editingPlan) {
    //  await this.businessService.updatePlan(this.editingPlan.id, this.formData);
    //} else {
    //  await this.businessService.createPlan(this.formData);
    //}

    await this.loadPlans();
    this.closeCreateView();
  }

  async togglePlanStatus(plan: Plan) {
    //await this.businessService.updatePlan(plan.id, { is_active: !plan.is_active });
    await this.loadPlans();
  }

  openDeleteConfirm(plan: Plan) {
    this.planToDelete = plan;
    this.showDeleteConfirm = true;
  }

  closeDeleteConfirm() {
    this.showDeleteConfirm = false;
    this.planToDelete = null;
  }

  async confirmDelete() {
    if (this.planToDelete) {
      //await this.businessService.deletePlan(this.planToDelete.id);
      await this.loadPlans();
      this.closeDeleteConfirm();
    }
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  addFeature() {
    if (this.newFeature.trim()) {
      this.formData.features.push(this.newFeature.trim());
      this.newFeature = '';
    }
  }

  removeFeature(index: number) {
    this.formData.features.splice(index, 1);
  }

  setType(type: 'monthly' | 'yearly') {
    this.formData.type = type;
  }

  markAllTouched() {
    Object.keys(this.touched).forEach(key => {
      (this.touched as any)[key] = true;
    });
  }

  validateAll() {
    this.validateName();
    this.validatePrice();
    this.validateDescription();
  }

  validateName() {
    if (this.touched.name) {
      if (!this.formData.name.trim()) {
        this.errors.name = 'El nombre del plan es requerido';
      } else if (this.formData.name.trim().length < 2) {
        this.errors.name = 'El nombre debe tener al menos 2 caracteres';
      } else {
        this.errors.name = '';
      }
    }
  }

  validatePrice() {
    if (this.touched.price) {
      if (this.formData.price <= 0) {
        this.errors.price = 'El precio debe ser mayor a 0';
      } else {
        this.errors.price = '';
      }
    }
  }

  validateDescription() {
    if (this.touched.description) {
      if (!this.formData.description.trim()) {
        this.errors.description = 'La descripción es requerida';
      } else if (this.formData.description.trim().length < 10) {
        this.errors.description = 'La descripción debe tener al menos 10 caracteres';
      } else {
        this.errors.description = '';
      }
    }
  }

  isFormValid(): boolean {
    return !this.errors.name &&
           !this.errors.price &&
           !this.errors.description &&
           this.formData.name.trim() !== '' &&
           this.formData.price > 0 &&
           this.formData.description.trim() !== '';
  }

  onFieldBlur(field: keyof typeof this.touched) {
    this.touched[field] = true;
    switch(field) {
      case 'name': this.validateName(); break;
      case 'price': this.validatePrice(); break;
      case 'description': this.validateDescription(); break;
    }
  }
}
