import { supabase } from '@/integrations/supabase/client';

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: any;
  meta_description?: string;
  meta_keywords?: string;
  is_published: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: any;
  description?: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface NavigationMenu {
  id: string;
  name: string;
  items: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Pages
export const getAllPages = async (): Promise<Page[]> => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getPageBySlug = async (slug: string): Promise<Page | null> => {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data;
};

export const createPage = async (pageData: Partial<Page>): Promise<Page> => {
  const user = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from('pages')
    .insert({
      title: pageData.title || '',
      slug: pageData.slug || '',
      content: pageData.content,
      meta_description: pageData.meta_description,
      meta_keywords: pageData.meta_keywords,
      is_published: pageData.is_published || false,
      created_by: user.data.user?.id
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updatePage = async (id: string, pageData: Partial<Page>): Promise<Page> => {
  const { data, error } = await supabase
    .from('pages')
    .update(pageData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deletePage = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('pages')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Site Settings
export const getAllSettings = async (): Promise<SiteSetting[]> => {
  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .order('category', { ascending: true });

  if (error) throw error;
  return data || [];
};

export const updateSetting = async (key: string, value: any): Promise<SiteSetting> => {
  const { data, error } = await supabase
    .from('site_settings')
    .update({ value })
    .eq('key', key)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const createSetting = async (settingData: Partial<SiteSetting>): Promise<SiteSetting> => {
  const { data, error } = await supabase
    .from('site_settings')
    .insert({
      key: settingData.key || '',
      value: settingData.value,
      description: settingData.description,
      category: settingData.category || 'general'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Navigation Menus
export const getAllNavigationMenus = async (): Promise<NavigationMenu[]> => {
  const { data, error } = await supabase
    .from('navigation_menus')
    .select('*')
    .order('name', { ascending: true });

  if (error) throw error;
  return (data || []).map(item => ({
    ...item,
    items: Array.isArray(item.items) ? item.items : JSON.parse(item.items as string || '[]')
  }));
};

export const updateNavigationMenu = async (id: string, menuData: Partial<NavigationMenu>): Promise<NavigationMenu> => {
  const { data, error } = await supabase
    .from('navigation_menus')
    .update(menuData)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return {
    ...data,
    items: Array.isArray(data.items) ? data.items : JSON.parse(data.items as string || '[]')
  };
};

export const getActiveNavigationMenu = async (name: string = 'main_navigation'): Promise<NavigationMenu | null> => {
  const { data, error } = await supabase
    .from('navigation_menus')
    .select('*')
    .eq('name', name)
    .eq('is_active', true)
    .single();

  if (error && error.code !== 'PGRST116') throw error;
  return data ? {
    ...data,
    items: Array.isArray(data.items) ? data.items : JSON.parse(data.items as string || '[]')
  } : null;
};