import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Folder, 
  ChevronDown, 
  Download, 
  FileText, 
  File, 
  Image, 
  Video, 
  Archive,
  Settings,
  FolderOpen
} from 'lucide-react';
import { useState } from 'react';
import type { CategoryWithFiles } from '@shared/schema';

export default function PublicDownloads() {
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const { data: categories = [], isLoading: categoriesLoading } = useQuery<CategoryWithFiles[]>({
    queryKey: ['/api/categories'],
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
    <div className="min-h-screen py-20 px-4" data-testid="public-downloads-page">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 glow-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            data-testid="title"
          >
            Downloads
          </motion.h2>
          <motion.p 
            className="text-xl text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            data-testid="subtitle"
          >
            Browse and download available files
          </motion.p>
        </div>

        {/* Categories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {categoriesLoading ? (
            <div className="text-center py-12" data-testid="categories-loading">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading files...</p>
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-12" data-testid="no-categories">
              <FolderOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No files available</h3>
              <p className="text-muted-foreground">Check back later for new uploads</p>
            </div>
          ) : (
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
                        <ChevronDown 
                          className={`transition-transform duration-300 ${
                            openCategories.has(category.id) ? 'rotate-180' : ''
                          }`} 
                          size={20} 
                        />
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
          )}
        </motion.div>
      </div>
    </div>
  );
}