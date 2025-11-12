import { HttpHeaders } from "@angular/common/http";

export const headers = new HttpHeaders({ "Content-Type": "application/json" });
export const options = { headers: headers };
export const exito = "Success";
export const error = "Error";
export const exito_swal = 'success';
export const error_swal = 'error';
export const error_falta_datos = "DATOS INCOMPLETOS, FAVOR INGRESE TODOS LOS DATOS"
export const business_name = '+Breve';
export const prefix = "+57"