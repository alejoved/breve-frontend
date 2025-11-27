import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

export interface Business {
  id: string;
  user_id: string;
  name: string;
  email: string;
  owner_name?: string;
  phone?: string;
  address?: string;
  bank_name?: string;
  account_type?: 'corriente' | 'ahorros';
  account_number?: string;
  swift_bic?: string;
  subscription_slug?: string;
  created_at: string;
}

export interface Plan {
  id: string;
  business_id: string;
  name: string;
  price: number;
  description: string;
  period: 'monthly' | 'yearly';
  features: string[];
  is_active: boolean;
  contract?: string;
  created_at: string;
}

export interface Subscriber {
  id: string;
  business_id: string;
  plan_id: string;
  name: string;
  email: string;
  phone?: string;
  status: 'active' | 'cancelled' | 'pending';
  started_at: string;
  cancelled_at?: string;
  plan?: Plan;
}

export interface Payment {
  id: string;
  business_id: string;
  subscriber_id: string;
  amount: number;
  payment_date: string;
}

export interface DashboardStats {
  activeSubscribers: number;
  activePlans: number;
  monthlyRevenue: number;
  retentionRate: number;
  subscriberChange: number;
  plansChange: number;
  revenueChange: number;
  retentionChange: number;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private supabase = this.supabaseService.getClient();
  private currentBusinessId: string | null = null;

  constructor(private supabaseService: SupabaseService) {}

  async initializeBusiness() {
    const user = this.supabaseService.getUser();
    if (!user) return null;

    const { data: business } = await this.supabase
      .from('businesses')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (!business) {
      const { data: newBusiness } = await this.supabase
        .from('businesses')
        .insert({
          user_id: user.id,
          name: user.email?.split('@')[0] || 'Mi Negocio',
          email: user.email || ''
        })
        .select()
        .single();

      this.currentBusinessId = newBusiness?.id || null;
      return newBusiness;
    }

    this.currentBusinessId = business.id;
    return business;
  }

  async getBusinessId() {
    if (!this.currentBusinessId) {
      const business = await this.initializeBusiness();
      return business?.id || null;
    }
    return this.currentBusinessId;
  }

  async getDashboardStats(): Promise<DashboardStats> {
    const businessId = await this.getBusinessId();
    if (!businessId) {
      return {
        activeSubscribers: 0,
        activePlans: 0,
        monthlyRevenue: 0,
        retentionRate: 0,
        subscriberChange: 0,
        plansChange: 0,
        revenueChange: 0,
        retentionChange: 0
      };
    }

    const { data: subscribers } = await this.supabase
      .from('subscribers')
      .select('*')
      .eq('business_id', businessId);

    const { data: plans } = await this.supabase
      .from('plans')
      .select('*')
      .eq('business_id', businessId)
      .eq('is_active', true);

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const { data: payments } = await this.supabase
      .from('payments')
      .select('amount')
      .eq('business_id', businessId)
      .gte('payment_date', firstDayOfMonth.toISOString());

    const activeSubscribers = subscribers?.filter(s => s.status === 'active').length || 0;
    const activePlans = plans?.length || 0;
    const monthlyRevenue = payments?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;
    const retentionRate = subscribers && subscribers.length > 0
      ? (activeSubscribers / subscribers.length) * 100
      : 0;

    return {
      activeSubscribers,
      activePlans,
      monthlyRevenue,
      retentionRate,
      subscriberChange: 12,
      plansChange: 0,
      revenueChange: 8,
      retentionChange: -3
    };
  }

  async getRecentActivity() {
    const businessId = await this.getBusinessId();
    if (!businessId) return [];

    const { data: subscribers } = await this.supabase
      .from('subscribers')
      .select('*, plan:plans(*)')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false })
      .limit(10);

    return subscribers || [];
  }

  async getTodayActivity() {
    const businessId = await this.getBusinessId();
    if (!businessId) return { newSubscriptions: 0, cancellations: 0, renewals: 0, revenue: 0 };

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const { data: todaySubscribers } = await this.supabase
      .from('subscribers')
      .select('status')
      .eq('business_id', businessId)
      .gte('created_at', today.toISOString());

    const { data: todayPayments } = await this.supabase
      .from('payments')
      .select('amount')
      .eq('business_id', businessId)
      .gte('payment_date', today.toISOString());

    const newSubscriptions = todaySubscribers?.filter(s => s.status === 'active').length || 0;
    const cancellations = todaySubscribers?.filter(s => s.status === 'cancelled').length || 0;
    const revenue = todayPayments?.reduce((sum, p) => sum + parseFloat(p.amount), 0) || 0;

    return {
      newSubscriptions,
      cancellations,
      renewals: 0,
      revenue
    };
  }

  async getPlans(): Promise<Plan[]> {
    const businessId = await this.getBusinessId();
    if (!businessId) return [];

    const { data } = await this.supabase
      .from('plans')
      .select('*')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    return data || [];
  }

  async createPlan(plan: Partial<Plan>): Promise<Plan | null> {
    const businessId = await this.getBusinessId();
    if (!businessId) return null;

    const { data } = await this.supabase
      .from('plans')
      .insert({
        business_id: businessId,
        ...plan
      })
      .select()
      .single();

    return data;
  }

  async updatePlan(id: string, updates: Partial<Plan>): Promise<Plan | null> {
    const { data } = await this.supabase
      .from('plans')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return data;
  }

  async deletePlan(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('plans')
      .delete()
      .eq('id', id);

    return !error;
  }

  async getSubscribers(): Promise<Subscriber[]> {
    const businessId = await this.getBusinessId();
    if (!businessId) return [];

    const { data } = await this.supabase
      .from('subscribers')
      .select('*, plan:plans(*)')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    return data || [];
  }

  async createSubscriber(subscriber: Partial<Subscriber>): Promise<Subscriber | null> {
    const businessId = await this.getBusinessId();
    if (!businessId) return null;

    const { data } = await this.supabase
      .from('subscribers')
      .insert({
        business_id: businessId,
        ...subscriber
      })
      .select()
      .single();

    return data;
  }

  async updateSubscriber(id: string, updates: Partial<Subscriber>): Promise<Subscriber | null> {
    const { data } = await this.supabase
      .from('subscribers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return data;
  }

  async getBusiness(): Promise<Business | null> {
    const businessId = await this.getBusinessId();
    if (!businessId) return null;

    const { data } = await this.supabase
      .from('businesses')
      .select('*')
      .eq('id', businessId)
      .maybeSingle();

    return data;
  }

  async updateBusiness(updates: Partial<Business>): Promise<Business | null> {
    const businessId = await this.getBusinessId();
    if (!businessId) return null;

    const { data } = await this.supabase
      .from('businesses')
      .update(updates)
      .eq('id', businessId)
      .select()
      .single();

    return data;
  }
}
