import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../models/plan';
import { PlanService } from '../../services/plan-service';
import { Business } from '../../models/business';
import { BusinessService } from '../../services/business-service';
import Swal from 'sweetalert2';
import { AuthB2BService } from '../../auth/auth-b2b-service';

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
  business: Business | null = null;
  loading = true;
  showCreateView = false;
  editingPlan: Plan | null = null;
  showDeleteConfirm = false;
  planToDelete: Plan | null = null;

  formData = {
    id: '',
    name: '',
    price: 0,
    description: '',
    type: 'mensual' as 'mensual' | 'anual',
    features: [] as string[],
    contract: '',
    active: true,
    business: { id: this.business?.id }
  };

  errors = {
    name: '',
    price: '',
    description: '',
    contract: ''
  };

  touched = {
    name: false,
    price: false,
    description: false,
    contract: false
  };

  newFeature = '';

  constructor(private planService: PlanService, private businessService: BusinessService, private authB2B: AuthB2BService) {}

  async ngOnInit() {
    const businessId = this.authB2B.getBusinessId();
    this.business = await this.businessService.filterById(businessId!);
    await this.loadPlans();
    if (this.openCreateForm) {
      this.openCreateView();
    }
  }

  async loadPlans() {
    this.loading = true;
    try {
      if (this.business) {
        this.plans = await this.planService.filterByBusiness(this.business?.id!);
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    } finally {
      this.loading = false;
    }
  }

  openCreateView() {
    this.editingPlan = null;
    this.formData = {
      id: '',
      name: '',
      description: '',
      features: [],
      price: 0,
      type: 'mensual',
      contract: '',
      active: true,
      business: { id: this.business?.id }
    };
    this.newFeature = '';
    this.showCreateView = true;
  }

  openEditView(plan: Plan) {
    this.editingPlan = plan;
    this.formData = {
      id: plan.id!,
      name: plan.name!,
      description: plan.description!,
      features: [...(plan.features || [])],
      price: plan.price!,
      type: plan.type! as 'mensual' | 'anual',
      contract: plan.contract || '',
      active: plan.active === true,
      business: { id: this.business?.id }
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
    try {
      if (this.editingPlan) {
        await this.planService.update(this.formData);
      } else {
        await this.planService.create(this.formData);
      }
      await this.loadPlans();
    } catch (ex: any) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    } finally {
      this.closeCreateView();
    }
  }

  async togglePlanStatus(plan: Plan) {
    await this.planService.update(plan);
    await this.loadPlans();
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

  setType(type: 'mensual' | 'anual') {
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
    this.validateContract();
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

  validateContract() {
    this.errors.contract = '';
  }

  isFormValid(): boolean {
    return !this.errors.name &&
           !this.errors.price &&
           !this.errors.description &&
           !this.errors.contract &&
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
      case 'contract': this.validateContract(); break;
    }
  }
}
