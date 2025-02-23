import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { uploadImage } from '../../lib/uploadImage';
import { ImagePlus, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
}

export function ImageUpload({ onImageUploaded }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    try {
      setUploading(true);
      const url = await uploadImage(file);
      onImageUploaded(url);
    } catch (error) {
      console.error('Error uploading image:', error);
      // You might want to show a toast notification here
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id="image-upload"
        />
        <label
          htmlFor="image-upload"
          className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary/50 transition-colors"
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center space-y-2 text-muted-foreground">
              <ImagePlus className="w-8 h-8" />
              <span>Click to upload cover image</span>
            </div>
          )}
        </label>
      </div>

      {uploading && (
        <div className="flex items-center justify-center text-sm text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          Uploading image...
        </div>
      )}
    </div>
  );
}
