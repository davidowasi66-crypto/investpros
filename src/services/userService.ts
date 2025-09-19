
import { supabase } from '@/integrations/supabase/client';

export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
  
  return data;
};

export const updateUserProfile = async (userId: string, profileData: {
  username?: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(profileData)
    .eq('id', userId)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
  
  return data;
};

export const getAllUsers = async () => {
  // First get all profiles
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (profilesError) {
    console.error('Error fetching profiles:', profilesError);
    throw profilesError;
  }
  
  // Then get all user roles
  const { data: userRoles, error: rolesError } = await supabase
    .from('user_roles')
    .select('*');
    
  if (rolesError) {
    console.error('Error fetching user roles:', rolesError);
    throw rolesError;
  }
  
  // Join the data manually
  const usersWithRolesAndEmail = profiles.map(profile => ({
    ...profile,
    email: profile.username, // Using username as email
    user_roles: userRoles.filter(role => role.user_id === profile.id)
  }));
  
  return usersWithRolesAndEmail;
};

export const getUserReferrals = async (userId: string) => {
  const { data, error } = await supabase
    .from('referrals')
    .select(`
      *,
      referred:referred_id (
        username,
        full_name
      )
    `)
    .eq('referrer_id', userId)
    .order('created_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching user referrals:', error);
    throw error;
  }
  
  return data;
};

// Function to promote a user to admin
export const promoteUserToAdmin = async (userId: string) => {
  // Update the user's role in the profiles table
  const { data, error } = await supabase
    .from('profiles')
    .update({ role: 'admin' })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) {
    console.error('Error promoting user to admin:', error);
    throw error;
  }
  
  return { message: 'User promoted to admin successfully', data };
};

// Function to demote a user from admin
export const demoteUserFromAdmin = async (userId: string) => {
  // Update the user's role in the profiles table
  const { data, error } = await supabase
    .from('profiles')
    .update({ role: 'user' })
    .eq('id', userId)
    .select()
    .single();
    
  if (error) {
    console.error('Error demoting user from admin:', error);
    throw error;
  }
  
  return { message: 'User demoted from admin successfully', data };
};

// Function to check if a user has a specific role
export const checkUserRole = async (userId: string, role: 'user' | 'admin') => {
  console.log(`Checking if user ${userId} has role ${role}`);
  
  try {
    // Check the user's role in the profiles table
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .maybeSingle();
      
    if (error) {
      console.error('Error checking user role:', error);
      throw error;
    }
    
    console.log('Role check result:', data);
    return data?.role === role;
  } catch (err) {
    console.error('Exception checking user role:', err);
    return false;
  }
};
