import { supabase } from '@/integrations/supabase/client';

export interface ExportOptions {
  include_pages?: boolean;
  include_settings?: boolean;
  include_navigation?: boolean;
  include_users?: boolean;
}

export interface ImportData {
  pages?: any[];
  settings?: any[];
  navigation?: any[];
}

class AdminService {
  private async callAdminFunction(operation: string, data?: any) {
    const session = await supabase.auth.getSession();
    const token = session.data.session?.access_token;

    if (!token) {
      throw new Error('Not authenticated');
    }

    const response = await fetch(
      `https://okishlqrjdfqwyhcqmvm.supabase.co/functions/v1/admin-operations`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ operation, data }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Admin operation failed');
    }

    return response.json();
  }

  async bulkUpdateSettings(settings: Array<{ key: string; value: any }>) {
    return this.callAdminFunction('bulk_update_settings', settings);
  }

  async exportData(options: ExportOptions) {
    return this.callAdminFunction('export_data', options);
  }

  async importContent(content: ImportData) {
    return this.callAdminFunction('import_content', content);
  }

  async createSystemBackup() {
    return this.callAdminFunction('system_backup');
  }

  async clearCache() {
    return this.callAdminFunction('clear_cache');
  }

  // Analytics and monitoring
  async getSystemStats() {
    const [users, pages, transactions] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('pages').select('*', { count: 'exact', head: true }),
      supabase.from('transactions').select('*', { count: 'exact', head: true }),
    ]);

    return {
      total_users: users.count || 0,
      total_pages: pages.count || 0,
      total_transactions: transactions.count || 0,
      last_updated: new Date().toISOString(),
    };
  }

  // Advanced user management
  async getUserActivity(userId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: transactions } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', startDate.toISOString());

    return {
      user_id: userId,
      transactions: transactions || [],
      period_days: days,
    };
  }

  // Security and audit
  async getAuditLog(limit: number = 100) {
    // This would typically come from an audit log table
    const { data: recentTransactions } = await supabase
      .from('transactions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);

    return {
      events: recentTransactions || [],
      fetched_at: new Date().toISOString(),
    };
  }
}

export const adminService = new AdminService();