
import { supabase } from '@/integrations/supabase/client';

export const getInvestmentPlans = async () => {
  const { data, error } = await supabase
    .from('investment_plans')
    .select('*')
    .order('minimum_amount', { ascending: true });
    
  if (error) {
    console.error('Error fetching investment plans:', error);
    throw error;
  }
  
  return data;
};

export const getUserInvestments = async (userId: string) => {
  const { data, error } = await supabase
    .from('investments')
    .select(`
      *,
      investment_plans:plan_id (title, percentage, duration)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching user investments:', error);
    throw error;
  }
  
  return data;
};

export const getAllInvestments = async () => {
  const { data, error } = await supabase
    .from('investments')
    .select(`
      *,
      investment_plans:plan_id (title, percentage, duration),
      profiles:user_id (username, full_name)
    `)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching all investments:', error);
    throw error;
  }
  
  return data;
};

export const createInvestment = async (investmentData: {
  user_id: string;
  plan_id: string;
  amount: number;
}) => {
  // Get plan details to calculate end_date and next_payout
  const { data: plan, error: planError } = await supabase
    .from('investment_plans')
    .select('duration, percentage')
    .eq('id', investmentData.plan_id)
    .single();
    
  if (planError) {
    console.error('Error fetching plan details:', planError);
    throw planError;
  }
  
  // Calculate dates
  const startDate = new Date();
  
  // Parse duration (e.g., "30 days", "60 days")
  const durationMatch = plan.duration.match(/(\d+)\s*days?/i);
  const durationDays = durationMatch ? parseInt(durationMatch[1]) : 30;
  
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + durationDays);
  
  // Next payout in 7 days (weekly payout)
  const nextPayout = new Date();
  nextPayout.setDate(startDate.getDate() + 7);
  
  // Calculate expected return
  const returnAmount = investmentData.amount * (plan.percentage / 100);
  
  const { data, error } = await supabase
    .from('investments')
    .insert({
      ...investmentData,
      start_date: startDate.toISOString(),
      end_date: endDate.toISOString(),
      next_payout: nextPayout.toISOString(),
      return_amount: returnAmount,
      status: 'Active'
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error creating investment:', error);
    throw error;
  }
  
  return data;
};
