import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Image, Upload, X } from 'lucide-react';
import { uploadImage } from '@/lib/uploadImage';
import { toast } from 'react-hot-toast';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  className?: string;
}

export function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setLoading(true);
      const file = acceptedFiles[0];
      if (!file) return;

      const url = await uploadImage(file);
      onChange(url);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setLoading(false);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1,
    disabled: loading
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        'relative border-2 border-dashed rounded-lg cursor-pointer transition-colors',
        isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
        className
      )}
    >
      <input {...getInputProps()} />

      {value ? (
        <>
          <img
            src={value}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-lg"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2"
            onClick={(e) => {
              e.stopPropagation();
              onChange('');
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-center">
          {loading ? (
            <div className="space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
              <p className="text-sm text-muted-foreground">Uploading...</p>
            </div>
          ) : (
            <>
              {isDragActive ? (
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
              ) : (
                <Image className="h-10 w-10 text-muted-foreground mb-2" />
              )}
              <p className="text-sm font-medium">
                {isDragActive ? 'Drop image here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                PNG, JPG or GIF (max. 5MB)
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
