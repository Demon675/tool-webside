import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Folder, 
  ChevronDown, 
  Download, 
  Trash2, 
  FileText, 
  File, 
  Image, 
  Video, 
  Archive,
  Settings
} from 'lucide-react';
import { isUnauthorizedError } from '@/lib/authUtils';
import type { CategoryWithFiles, FileWithDetails } from '@shared/schema';

interface CategoryAccordionProps {
  categories: CategoryWithFiles[];
}

export function CategoryAccordion({ categories }: CategoryAccordionProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const deleteFileMutation = useMutation({
    mutationFn: async (fileId: string) => {
      await apiRequest('DELETE', `/api/files/${fileId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      queryClient.invalidateQueries({ queryKey: ['/api/files'] });
      toast({
        title: "Success",
        description: "File deleted successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: async (categoryId: string) => {
      await apiRequest('DELETE', `/api/categories/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      toast({
        title: "Success",
        description: "Category deleted successfully",
      });
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete category",
        variant: "destructive",
      });
    },
  });

  const toggleCategory = (categoryId: string) => {
    const newOpenCategories = new Set(openCategories);
    if (newOpenCategories.has(categoryId)) {
      newOpenCategories.delete(categoryId);
    } else {
      newOpenCategories.add(categoryId);
    }
    setOpenCategories(newOpenCategories);
  };

  const getFileIcon = (mimeType: string, originalName: string) => {
    if (mimeType.startsWith('image/')) return <Image className="text-pink-500" size={20} />;
    if (mimeType.startsWith('video/')) return <Video className="text-red-500" size={20} />;
    if (mimeType.includes('pdf')) return <FileText className="text-red-500" size={20} />;
    if (mimeType.includes('zip') || mimeType.includes('archive')) return <Archive className="text-yellow-500" size={20} />;
    if (originalName.endsWith('.exe')) return <Settings className="text-purple-500" size={20} />;
    if (mimeType.includes('word')) return <FileText className="text-blue-500" size={20} />;
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return <FileText className="text-green-500" size={20} />;
    return <File className="text-gray-500" size={20} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays <= 7) return `${diffDays} days ago`;
    if (diffDays <= 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleDownload = (fileId: string, originalName: string) => {
    window.open(`/api/files/${fileId}/download`, '_blank');
  };

  return (
    <div className="space-y-6" data-testid="category-accordion">
      {categories.map((category) => (
        <div key={category.id} className="glass-effect rounded-xl overflow-hidden" data-testid={`category-${category.slug}`}>
          <Collapsible 
            open={openCategories.has(category.id)}
            onOpenChange={() => toggleCategory(category.id)}
          >
            <CollapsibleTrigger asChild>
              <button 
                className="w-full p-6 text-left flex justify-between items-center hover:bg-secondary/50 transition-colors duration-300"
                data-testid={`button-toggle-${category.slug}`}
              >
                <div className="flex items-center space-x-3">
                  <Folder className="text-accent" size={20} />
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
                    {category.files.length} files
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCategoryMutation.mutate(category.id);
                    }}
                    className="text-red-500 hover:text-red-400"
                    data-testid={`button-delete-category-${category.slug}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                  <ChevronDown 
                    className={`transition-transform duration-300 ${
                      openCategories.has(category.id) ? 'rotate-180' : ''
                    }`} 
                    size={20} 
                  />
                </div>
              </button>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <div className="p-6 border-t border-border" data-testid={`content-${category.slug}`}>
                {category.files.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">No files in this category</p>
                ) : (
                  <div className="grid gap-4">
                    {category.files.map((file) => (
                      <div 
                        key={file.id} 
                        className="flex items-center justify-between p-4 bg-secondary rounded-lg"
                        data-testid={`file-${file.id}`}
                      >
                        <div className="flex items-center space-x-3">
                          {getFileIcon(file.mimeType, file.originalName)}
                          <div>
                            <h4 className="font-medium">{file.originalName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(file.size)} • Uploaded {formatDate(file.createdAt!.toString())}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            onClick={() => handleDownload(file.id, file.originalName)}
                            className="bg-accent text-accent-foreground neon-glow"
                            data-testid={`button-download-${file.id}`}
                          >
                            <Download className="mr-1" size={14} />
                            Download
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteFileMutation.mutate(file.id)}
                            disabled={deleteFileMutation.isPending}
                            data-testid={`button-delete-${file.id}`}
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      ))}
    </div>
  );
}
