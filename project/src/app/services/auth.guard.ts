import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

export const authGuard = () => {
  const supabaseService = inject(SupabaseService);
  const router = inject(Router);

  const user = supabaseService.getUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
