
import { supabase } from '@/integrations/supabase/client';
import { Guru } from '@/types/guru';

export const fetchAllGuru = async (): Promise<Guru[]> => {
  const { data, error } = await supabase
    .from('guru')
    .select('*')
    .order('nama');
    
  if (error) {
    throw error;
  }
  
  return data as Guru[];
};

export const createGuru = async (
  nama: string,
  bidangStudi: string | null,
  waliKelas: string | null,
  nomorKontak: string | null
): Promise<void> => {
  const { error } = await supabase
    .from('guru')
    .insert({
      nama: nama,
      bidang_studi: bidangStudi,
      wali_kelas: waliKelas,
      nomor_kontak: nomorKontak,
      user_id: crypto.randomUUID(), // This is temporary; in a real app, you'd link to auth user
    });
    
  if (error) {
    throw error;
  }
};

export const updateGuru = async (
  id: string,
  nama: string,
  bidangStudi: string | null,
  waliKelas: string | null,
  nomorKontak: string | null
): Promise<void> => {
  const { error } = await supabase
    .from('guru')
    .update({
      nama: nama,
      bidang_studi: bidangStudi,
      wali_kelas: waliKelas,
      nomor_kontak: nomorKontak,
    })
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};

export const deleteGuru = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('guru')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};
