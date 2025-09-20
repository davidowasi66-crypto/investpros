
import { supabase } from '@/integrations/supabase/client';

export const getSettings = async () => {
  // Return default settings since settings table doesn't exist yet
  return {
    site_name: 'Investment Platform',
    maintenance_mode: 'false',
    registration_enabled: 'true'
  };
};

export const updateSetting = async (key: string, value: any) => {
  // Return mock data since settings table doesn't exist yet
  return { key, value };
};
