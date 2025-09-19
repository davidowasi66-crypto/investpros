
import { supabase } from '@/integrations/supabase/client';

export const getSettings = async () => {
  const { data, error } = await supabase
    .from('settings')
    .select('*');
    
  if (error) {
    console.error('Error fetching settings:', error);
    throw error;
  }
  
  // Convert to a key-value object for easier access
  const settingsObject = data.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {} as Record<string, any>);
  
  return settingsObject;
};

export const updateSetting = async (key: string, value: any) => {
  const { data, error } = await supabase
    .from('settings')
    .update({ value })
    .eq('key', key)
    .select()
    .single();
    
  if (error) {
    console.error(`Error updating setting ${key}:`, error);
    throw error;
  }
  
  return data;
};
