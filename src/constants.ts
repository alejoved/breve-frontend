import { HttpHeaders } from "@angular/common/http";
export const credencialUsuario = "admin";
export const credencialPassword = "admin";
export const credencial = credencialUsuario + ":" + credencialPassword;
export const headersBasic = new HttpHeaders({ "Content-Type": "application/json", "Authorization": "Basic " + btoa(credencial) });
export const optionsBasic = { headers: headersBasic };
export const headersAuth= new HttpHeaders({ "Content-Type": "application/json", "Authorization": "Bearer " + sessionStorage.getItem('token') || "" });
export const optionsAuth = { headers: headersAuth };
export const exito = "Success";
export const error = "Error";
export const exito_swal = 'success';
export const error_swal = 'error';
export const error_falta_datos = "DATOS INCOMPLETOS, FAVOR INGRESE TODOS LOS DATOS"
export const business_name = '+Breve';
export const prefix = "+57"