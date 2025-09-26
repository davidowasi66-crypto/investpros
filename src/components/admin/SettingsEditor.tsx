import React, { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { SiteSetting, getAllSettings, updateSetting, createSetting } from '@/services/contentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Plus, Trash2 } from 'lucide-react';

const SettingsEditor: React.FC = () => {
  const [editedSettings, setEditedSettings] = useState<Record<string, any>>({});
  const [newSetting, setNewSetting] = useState({ key: '', value: '', description: '', category: 'general' });
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: settings = [], isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: getAllSettings,
  });

  useEffect(() => {
    const initialSettings: Record<string, any> = {};
    settings.forEach(setting => {
      try {
        initialSettings[setting.key] = typeof setting.value === 'string' 
          ? JSON.parse(setting.value) 
          : setting.value;
      } catch {
        initialSettings[setting.key] = setting.value;
      }
    });
    setEditedSettings(initialSettings);
  }, [settings]);

  const handleSettingChange = (key: string, value: any) => {
    setEditedSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const updatePromises = Object.entries(editedSettings).map(([key, value]) => {
        const jsonValue = typeof value === 'string' ? value : JSON.stringify(value);
        return updateSetting(key, jsonValue);
      });

      await Promise.all(updatePromises);
      
      toast({
        title: 'Success',
        description: 'Settings updated successfully',
      });

      queryClient.invalidateQueries({ queryKey: ['settings'] });
    } catch (error) {
      console.error('Error updating settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update settings',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCreateSetting = async () => {
    if (!newSetting.key.trim()) {
      toast({
        title: 'Error',
        description: 'Setting key is required',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createSetting({
        key: newSetting.key,
        value: newSetting.value,
        description: newSetting.description,
        category: newSetting.category,
      });

      setNewSetting({ key: '', value: '', description: '', category: 'general' });
      
      toast({
        title: 'Success',
        description: 'Setting created successfully',
      });

      queryClient.invalidateQueries({ queryKey: ['settings'] });
    } catch (error) {
      console.error('Error creating setting:', error);
      toast({
        title: 'Error',
        description: 'Failed to create setting',
        variant: 'destructive',
      });
    }
  };

  const renderSettingInput = (setting: SiteSetting) => {
    const value = editedSettings[setting.key] ?? '';
    
    if (typeof value === 'boolean' || setting.key.includes('enabled') || setting.key.includes('mode')) {
      return (
        <div className="flex items-center space-x-2">
          <Switch
            checked={Boolean(value)}
            onCheckedChange={(checked) => handleSettingChange(setting.key, checked)}
          />
          <Label>{setting.description || setting.key}</Label>
        </div>
      );
    }

    if (setting.description && setting.description.length > 50) {
      return (
        <div>
          <Label>{setting.key}</Label>
          <Textarea
            value={String(value)}
            onChange={(e) => handleSettingChange(setting.key, e.target.value)}
            placeholder={setting.description}
          />
        </div>
      );
    }

    return (
      <div>
        <Label>{setting.key}</Label>
        <Input
          value={String(value)}
          onChange={(e) => handleSettingChange(setting.key, e.target.value)}
          placeholder={setting.description}
        />
      </div>
    );
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    const category = setting.category || 'general';
    if (!acc[category]) acc[category] = [];
    acc[category].push(setting);
    return acc;
  }, {} as Record<string, SiteSetting[]>);

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Site Settings</h2>
        <Button onClick={handleSaveSettings} disabled={isSaving}>
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue={Object.keys(groupedSettings)[0] || 'general'}>
        <TabsList>
          {Object.keys(groupedSettings).map(category => (
            <TabsTrigger key={category} value={category} className="capitalize">
              {category}
            </TabsTrigger>
          ))}
          <TabsTrigger value="add-new">Add New</TabsTrigger>
        </TabsList>

        {Object.entries(groupedSettings).map(([category, categorySettings]) => (
          <TabsContent key={category} value={category}>
            <Card>
              <CardHeader>
                <CardTitle className="capitalize">{category} Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {categorySettings.map(setting => (
                  <div key={setting.id} className="border-b pb-4 last:border-b-0">
                    {renderSettingInput(setting)}
                    {setting.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {setting.description}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}

        <TabsContent value="add-new">
          <Card>
            <CardHeader>
              <CardTitle>Add New Setting</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Key</Label>
                <Input
                  value={newSetting.key}
                  onChange={(e) => setNewSetting(prev => ({ ...prev, key: e.target.value }))}
                  placeholder="setting_key"
                />
              </div>

              <div>
                <Label>Value</Label>
                <Input
                  value={newSetting.value}
                  onChange={(e) => setNewSetting(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="Setting value"
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  value={newSetting.description}
                  onChange={(e) => setNewSetting(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Description of this setting"
                />
              </div>

              <div>
                <Label>Category</Label>
                <Input
                  value={newSetting.category}
                  onChange={(e) => setNewSetting(prev => ({ ...prev, category: e.target.value }))}
                  placeholder="general"
                />
              </div>

              <Button onClick={handleCreateSetting}>
                <Plus className="h-4 w-4 mr-2" />
                Create Setting
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsEditor;