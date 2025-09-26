import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@/context/AuthContext';
import { getAllPages, deletePage, Page } from '@/services/contentService';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Settings,
  FileText,
  Menu,
  Globe,
  Database,
  Users,
  ArrowLeft
} from 'lucide-react';
import PageEditor from '@/components/admin/PageEditor';
import SettingsEditor from '@/components/admin/SettingsEditor';
import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

type AdminSection = 'pages' | 'settings' | 'navigation' | 'users' | 'transactions';

const AdminContentManager: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('pages');
  const [selectedPage, setSelectedPage] = useState<Page | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: pages = [], isLoading, refetch } = useQuery({
    queryKey: ['admin-pages'],
    queryFn: getAllPages,
    enabled: !!user
  });

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    page.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditPage = (page: Page) => {
    setSelectedPage(page);
    setIsEditing(true);
  };

  const handleCreatePage = () => {
    setSelectedPage(null);
    setIsEditing(true);
  };

  const handleDeletePage = async (page: Page) => {
    if (!confirm(`Are you sure you want to delete "${page.title}"?`)) return;

    try {
      await deletePage(page.id);
      toast({
        title: 'Success',
        description: 'Page deleted successfully',
      });
      refetch();
    } catch (error) {
      console.error('Error deleting page:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete page',
        variant: 'destructive',
      });
    }
  };

  const handlePageSaved = (page: Page) => {
    setIsEditing(false);
    setSelectedPage(null);
    refetch();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedPage(null);
  };

  const navigationItems = [
    { id: 'pages', label: 'Pages', icon: FileText },
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'navigation', label: 'Navigation', icon: Menu },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'transactions', label: 'Transactions', icon: Database },
  ];

  const AppSidebar = () => {
    return (
      <Sidebar className="w-60" collapsible="icon">
        <SidebarTrigger className="m-2 self-end" />
        
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Content Management</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => setActiveSection(item.id as AdminSection)}
                        className={`w-full flex items-center ${
                          activeSection === item.id 
                            ? 'bg-primary text-primary-foreground' 
                            : 'hover:bg-muted'
                        }`}
                      >
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.label}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  };

  const renderPagesSection = () => {
    if (isEditing) {
      return (
        <PageEditor
          page={selectedPage}
          onSave={handlePageSaved}
          onCancel={handleCancelEdit}
        />
      );
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Pages Management</h1>
          <Button onClick={handleCreatePage}>
            <Plus className="h-4 w-4 mr-2" />
            Create Page
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
            <Input
              placeholder="Search pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <div className="text-center py-8">Loading pages...</div>
          ) : filteredPages.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No pages found. Create your first page!
            </div>
          ) : (
            filteredPages.map((page) => (
              <Card key={page.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">{page.title}</h3>
                        <Badge variant={page.is_published ? 'default' : 'secondary'}>
                          {page.is_published ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">/{page.slug}</p>
                      {page.meta_description && (
                        <p className="text-sm text-gray-500">{page.meta_description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-2">
                        Updated: {new Date(page.updated_at).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {page.is_published && (
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-1" />
                          Preview
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => handleEditPage(page)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePage(page)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'pages':
        return renderPagesSection();
      case 'settings':
        return <SettingsEditor />;
      case 'navigation':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Navigation Management</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">Navigation editor coming soon...</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">User Management</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">
                  <Button variant="outline" onClick={() => window.location.href = '/admin'}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go to Main Admin Dashboard
                  </Button>
                </p>
              </CardContent>
            </Card>
          </div>
        );
      case 'transactions':
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Transaction Management</h1>
            <Card>
              <CardContent className="p-6">
                <p className="text-center text-gray-500">
                  <Button variant="outline" onClick={() => window.location.href = '/admin'}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Go to Main Admin Dashboard
                  </Button>
                </p>
              </CardContent>
            </Card>
          </div>
        );
      default:
        return renderPagesSection();
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default AdminContentManager;