import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { CloudUpload, Plus } from 'lucide-react';
import { isUnauthorizedError } from '@/lib/authUtils';
import type { Category } from '@shared/schema';

export function FileUpload() {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('none');
  const [newCategoryName, setNewCategoryName] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ['/api/categories'],
  });

  const createCategoryMutation = useMutation({
    mutationFn: async (name: string) => {
      const response = await apiRequest('POST', '/api/categories', { name });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      setNewCategoryName('');
      toast({
        title: "Success",
        description: "Category created successfully",
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
        description: "Failed to create category",
        variant: "destructive",
      });
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('file', file);
      if (selectedCategoryId && selectedCategoryId !== 'none') {
        formData.append('categoryId', selectedCategoryId);
      }

      setIsUploading(true);
      setUploadProgress(0);

      // Simulate progress for better UX
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + Math.random() * 10;
        });
      }, 200);

      try {
        const response = await fetch('/api/files/upload', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });

        clearInterval(progressInterval);
        setUploadProgress(100);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${response.status}: ${errorText}`);
        }

        return response.json();
      } finally {
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 1000);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/categories'] });
      queryClient.invalidateQueries({ queryKey: ['/api/files'] });
      toast({
        title: "Success",
        description: "File uploaded successfully",
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
        description: "Failed to upload file",
        variant: "destructive",
      });
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadMutation.mutate(acceptedFiles[0]);
    }
  }, [uploadMutation]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip'],
      'application/octet-stream': ['.exe'],
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
      'video/*': ['.mp4', '.avi', '.mov'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.ms-excel': ['.xls'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'text/plain': ['.txt'],
    },
    multiple: false,
    disabled: isUploading,
  });

  const handleCreateCategory = () => {
    if (newCategoryName.trim()) {
      createCategoryMutation.mutate(newCategoryName.trim());
    }
  };

  return (
    <div className="glass-effect rounded-xl p-8" data-testid="file-upload">
      <h3 className="text-2xl font-bold mb-6 text-accent">Upload Files</h3>
      
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`upload-zone rounded-xl p-8 text-center cursor-pointer mb-6 border-2 border-dashed transition-all duration-300 ${
          isDragActive ? 'border-accent bg-accent/10' : 'border-border'
        } ${isUploading ? 'pointer-events-none opacity-50' : ''}`}
        data-testid="dropzone"
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <CloudUpload className="text-4xl text-accent mb-4" size={48} />
          <h4 className="text-xl font-semibold mb-2">
            {isDragActive ? 'Drop files here' : 'Drop files here or click to browse'}
          </h4>
          <p className="text-muted-foreground">
            Supports PDF, ZIP, EXE, Images and more
          </p>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="mb-6" data-testid="upload-progress">
          <div className="flex justify-between text-sm mb-2">
            <span>Uploading...</span>
            <span>{Math.round(uploadProgress)}%</span>
          </div>
          <Progress value={uploadProgress} className="w-full" />
        </div>
      )}

      {/* Category Selection */}
      <div className="flex flex-col sm:flex-row gap-4" data-testid="category-selection">
        <Select value={selectedCategoryId} onValueChange={setSelectedCategoryId}>
          <SelectTrigger className="flex-1 bg-input border-border">
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none">No Category</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Input
          type="text"
          placeholder="Or create new category"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          className="flex-1 bg-input border-border"
          data-testid="input-new-category"
        />
        
        <Button
          onClick={handleCreateCategory}
          disabled={!newCategoryName.trim() || createCategoryMutation.isPending}
          className="bg-accent text-accent-foreground neon-glow font-medium"
          data-testid="button-create-category"
        >
          <Plus className="mr-2" size={16} />
          Create
        </Button>
      </div>
    </div>
  );
}
