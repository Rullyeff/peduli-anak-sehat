
import { supabase } from '@/integrations/supabase/client';
import { Video } from '@/types/video';

export const fetchAllVideos = async (): Promise<Video[]> => {
  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .order('created_at', { ascending: false });
    
  if (error) {
    throw error;
  }
  
  return data as Video[];
};

export const createVideo = async (
  judul: string,
  deskripsi: string,
  url: string,
  kategori: string,
  thumbnail?: string,
  durasi?: string
): Promise<void> => {
  const { error } = await supabase
    .from('videos')
    .insert({
      judul,
      deskripsi,
      url,
      kategori,
      thumbnail,
      durasi,
    });
    
  if (error) {
    throw error;
  }
};

export const updateVideo = async (
  id: string,
  judul: string,
  deskripsi: string,
  url: string,
  kategori: string,
  thumbnail?: string,
  durasi?: string
): Promise<void> => {
  const { error } = await supabase
    .from('videos')
    .update({
      judul,
      deskripsi,
      url,
      kategori,
      thumbnail,
      durasi,
    })
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};

export const deleteVideo = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('videos')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};
