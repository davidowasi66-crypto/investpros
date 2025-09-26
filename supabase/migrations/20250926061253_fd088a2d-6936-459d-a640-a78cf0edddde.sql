-- Create content management tables
CREATE TABLE public.pages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB,
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create site settings table
CREATE TABLE public.site_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value JSONB,
  description TEXT,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create navigation menus table
CREATE TABLE public.navigation_menus (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_menus ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for pages
CREATE POLICY "Public can view published pages" ON public.pages
FOR SELECT USING (is_published = true);

CREATE POLICY "Admins can manage all pages" ON public.pages
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create RLS policies for site settings
CREATE POLICY "Admins can manage site settings" ON public.site_settings
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Public can view site settings" ON public.site_settings
FOR SELECT USING (true);

-- Create RLS policies for navigation menus
CREATE POLICY "Public can view navigation menus" ON public.navigation_menus
FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage navigation menus" ON public.navigation_menus
FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Create triggers for updated_at
CREATE TRIGGER update_pages_updated_at
  BEFORE UPDATE ON public.pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON public.site_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_navigation_menus_updated_at
  BEFORE UPDATE ON public.navigation_menus
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (key, value, description, category) VALUES
('site_name', '"Investment Platform"', 'The name of the website', 'general'),
('site_description', '"Professional investment platform"', 'Site description for SEO', 'general'),
('maintenance_mode', 'false', 'Enable/disable maintenance mode', 'general'),
('registration_enabled', 'true', 'Allow new user registrations', 'auth'),
('min_deposit', '100', 'Minimum deposit amount', 'payments'),
('max_deposit', '50000', 'Maximum deposit amount', 'payments'),
('withdrawal_fee', '2.5', 'Withdrawal fee percentage', 'payments'),
('admin_email', '"admin@platform.com"', 'Admin contact email', 'general');

-- Insert default navigation menu
INSERT INTO public.navigation_menus (name, items) VALUES
('main_navigation', '[
  {"label": "Home", "path": "/", "order": 1},
  {"label": "Investment Plans", "path": "/investment-plans", "order": 2},
  {"label": "Dashboard", "path": "/dashboard", "order": 3, "auth_required": true},
  {"label": "About", "path": "/about", "order": 4}
]');

-- Insert sample pages
INSERT INTO public.pages (title, slug, content, meta_description, is_published, created_by) VALUES
('Home Page', 'home', '{
  "sections": [
    {
      "type": "hero", 
      "title": "Professional Investment Platform", 
      "subtitle": "Grow your wealth with our expert investment solutions",
      "cta_text": "Get Started",
      "cta_link": "/auth"
    },
    {
      "type": "features",
      "title": "Why Choose Us",
      "items": [
        {"title": "Secure", "description": "Bank-level security"},
        {"title": "Profitable", "description": "High returns on investment"},
        {"title": "Transparent", "description": "Clear fee structure"}
      ]
    }
  ]
}', 'Professional investment platform with secure and profitable solutions', true, null),
('About Us', 'about', '{
  "sections": [
    {
      "type": "content",
      "title": "About Our Platform", 
      "content": "We are a leading investment platform dedicated to helping you grow your wealth."
    }
  ]
}', 'Learn about our investment platform and our mission', true, null);