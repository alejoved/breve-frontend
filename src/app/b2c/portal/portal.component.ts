import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer-service';
import { MeshGradientComponent } from "../../b2b/login/mesh-gradient.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-portal',
  standalone: true,
  imports: [CommonModule, FormsModule, MeshGradientComponent],
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.css']
})
export class PortalComponent implements OnInit, OnDestroy {
  @ViewChild('gradientCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  documentNumber: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  private gradient: any;

  constructor(private customerService: CustomerService, private router: Router) {}

  ngOnInit() {
  }

  ngOnDestroy() {
    if (this.gradient) {
      this.gradient.destroy();
    }
  }

  async onConsultar() {
    if (!this.documentNumber.trim()) {
      this.errorMessage = 'Por favor ingresa tu número de documento';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      const customer = await this.customerService.filterByDocumentNumber(this.documentNumber);
      if (customer) {
        this.router.navigate(['/payment'], { state: { customer: {id: customer.id } } });
      } else {
        this.errorMessage = 'No se encontró ningún cliente con este número de documento';
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: "Ha ocurrido un error. Intenta nuevamente más tarde." });
    } finally {
      this.isLoading = false;
    }
  }
}
