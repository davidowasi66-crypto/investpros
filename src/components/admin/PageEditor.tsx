import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Page, createPage, updatePage } from '@/services/contentService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, X } from 'lucide-react';

interface PageEditorProps {
  page?: Page | null;
  onSave: (page: Page) => void;
  onCancel: () => void;
}

const PageEditor: React.FC<PageEditorProps> = ({ page, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setSlug(page.slug);
      setContent(typeof page.content === 'object' ? JSON.stringify(page.content, null, 2) : page.content || '');
      setMetaDescription(page.meta_description || '');
      setMetaKeywords(page.meta_keywords || '');
      setIsPublished(page.is_published);
    }
  }, [page]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!page) { // Only auto-generate slug for new pages
      setSlug(generateSlug(value));
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !slug.trim()) {
      toast({
        title: 'Error',
        description: 'Title and slug are required',
        variant: 'destructive',
      });
      return;
    }

    setIsSaving(true);
    try {
      let parsedContent;
      try {
        parsedContent = content ? JSON.parse(content) : {};
      } catch {
        parsedContent = { type: 'text', content };
      }

      const pageData = {
        title,
        slug,
        content: parsedContent,
        meta_description: metaDescription,
        meta_keywords: metaKeywords,
        is_published: isPublished,
      };

      let savedPage;
      if (page) {
        savedPage = await updatePage(page.id, pageData);
      } else {
        savedPage = await createPage(pageData);
      }

      toast({
        title: 'Success',
        description: `Page ${page ? 'updated' : 'created'} successfully`,
      });

      onSave(savedPage);
    } catch (error) {
      console.error('Error saving page:', error);
      toast({
        title: 'Error',
        description: 'Failed to save page',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {page ? 'Edit Page' : 'Create New Page'}
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Page Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter page title"
                />
              </div>
              
              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="page-slug"
                />
              </div>

              <div>
                <Label htmlFor="content">Content (JSON)</Label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder='{"sections": [{"type": "hero", "title": "Page Title"}]}'
                  rows={12}
                  className="font-mono text-sm"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Enter content as JSON or plain text
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea
                  id="meta-description"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief description for search engines"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="meta-keywords">Meta Keywords</Label>
                <Input
                  id="meta-keywords"
                  value={metaKeywords}
                  onChange={(e) => setMetaKeywords(e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Page Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={isPublished}
                  onCheckedChange={setIsPublished}
                />
                <Label htmlFor="published">Published</Label>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Only published pages are visible to the public
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PageEditor;