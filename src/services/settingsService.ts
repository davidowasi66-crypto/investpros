
import { supabase } from '@/integrations/supabase/client';

export const getSettings = async () => {
  // Return default settings until database migration is approved
  return {
    site_name: 'Investment Platform',
    maintenance_mode: 'false',
    registration_enabled: 'true',
    coinbase_api_key: '',
    min_deposit: '100'
  };
};

export const updateSetting = async (key: string, value: any) => {
  // Return mock data until database migration is approved
  return { key, value };
};

export const getCryptoAddresses = async () => {
  // Return mock crypto addresses until database migration is approved
  return [
    {
      id: '1',
      currency: 'BTC',
      address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
      network: 'bitcoin'
    },
    {
      id: '2', 
      currency: 'ETH',
      address: '0x71C7656EC7ab88b098defB751B7401B5f6d8976F',
      network: 'ethereum'
    }
  ];
};
