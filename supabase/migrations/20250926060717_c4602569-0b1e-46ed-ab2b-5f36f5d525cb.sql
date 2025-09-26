-- Add address column to transactions table for crypto payments
ALTER TABLE public.transactions 
ADD COLUMN address TEXT;