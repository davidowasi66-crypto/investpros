
import { supabase } from '@/integrations/supabase/client';

export const getInvestmentPlans = async () => {
  // Return empty array since investment_plans table doesn't exist yet
  return [];
};

export const getUserInvestments = async (userId: string) => {
  // Use the Investment table that exists
  const { data, error } = await supabase
    .from('Investment')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching user investments:', error);
    throw error;
  }
  
  return data || [];
};

export const getAllInvestments = async () => {
  // Use the Investment table that exists
  const { data, error } = await supabase
    .from('Investment')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching all investments:', error);
    throw error;
  }
  
  return data || [];
};

export const createInvestment = async (investmentData: {
  user_id: string;
  plan_name: string;
  amount: number;
  interest_rate?: number;
}) => {
  // Use the Investment table that exists
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30); // Default 30 days
  
  const { data, error } = await supabase
    .from('Investment')
    .insert({
      user_id: investmentData.user_id,
      plan_name: investmentData.plan_name,
      amount: investmentData.amount,
      interest_rate: investmentData.interest_rate || 5.0,
      end_date: endDate.toISOString().split('T')[0], // Date only
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
