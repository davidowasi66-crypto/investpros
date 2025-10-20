
import { supabase } from '@/integrations/supabase/client';

export const getUserTransactions = async (userId: string) => {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching user transactions:', error);
    throw error;
  }
  
  return data;
};

export const getAllTransactions = async () => {
  // Get all transactions
  const { data: transactions, error: transactionsError } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (transactionsError) {
    console.error('Error fetching all transactions:', transactionsError);
    throw transactionsError;
  }
  
  // Get all profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*');
    
  if (profilesError) {
    console.error('Error fetching profiles:', profilesError);
    throw profilesError;
  }
  
  // Join transactions with user profiles manually
  const transactionsWithUserInfo = transactions.map(transaction => {
    const userProfile = profiles.find(profile => profile.id === transaction.user_id);
    return {
      ...transaction,
      profiles: userProfile || { username: 'Unknown', full_name: 'Unknown User' }
    };
  });
  
  return transactionsWithUserInfo;
};

export const createTransaction = async (transactionData: {
  user_id: string;
  type: 'Deposit' | 'Withdrawal' | 'Payout';
  amount: number;
  payment_method?: string;
  address?: string;
}) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert({
      ...transactionData,
      status: 'Pending'
    })
    .select()
    .single();
    
  if (error) {
    console.error('Error creating transaction:', error);
    throw error;
  }
  
  return data;
};

export const updateTransactionStatus = async (
  transactionId: string, 
  status: 'Pending' | 'Completed' | 'Failed',
  transactionHash?: string
) => {
  const updateData: any = { status };
  
  if (transactionHash) {
    updateData.transaction_hash = transactionHash;
  }
  
  const { data, error } = await supabase
    .from('transactions')
    .update(updateData)
    .eq('id', transactionId)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
  
  return data;
};
