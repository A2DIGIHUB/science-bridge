import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export async function uploadImage(file: File) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `blog-images/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}
