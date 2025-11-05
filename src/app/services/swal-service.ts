import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class SwalService {
  fire(options: SweetAlertOptions) {
    return Swal.fire(options);
  }

  success(title = 'Hecho', text?: string) {
    return this.fire({ icon: 'success', title, text });
  }

  error(title = 'Error', text?: string) {
    return this.fire({ icon: 'error', title, text });
  }

  confirm(title = '¿Estás seguro?', text?: string, confirmText = 'Sí', cancelText = 'Cancelar') {
    return this.fire({
      title,
      text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true
    });
  }
}