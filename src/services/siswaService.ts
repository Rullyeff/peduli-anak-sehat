
import { supabase } from '@/integrations/supabase/client';
import { Siswa } from '@/types/siswa';

export const fetchAllSiswa = async (): Promise<Siswa[]> => {
  const { data, error } = await supabase
    .from('siswa')
    .select('*')
    .order('nama');
    
  if (error) {
    throw error;
  }
  
  return data as Siswa[];
};

export const createSiswa = async (
  nama: string,
  kelas: string,
  alamat: string | null,
  tanggalLahir: string | null,
  orangTuaWali: string | null,
  nomorKontak: string | null
): Promise<void> => {
  const { error } = await supabase
    .from('siswa')
    .insert({
      nama: nama,
      kelas: kelas,
      alamat: alamat,
      tanggal_lahir: tanggalLahir,
      orang_tua_wali: orangTuaWali,
      nomor_kontak: nomorKontak,
      user_id: crypto.randomUUID(), // This is temporary; in a real app, you'd link to auth user
    });
    
  if (error) {
    throw error;
  }
};

export const updateSiswa = async (
  id: string,
  nama: string,
  kelas: string,
  alamat: string | null,
  tanggalLahir: string | null,
  orangTuaWali: string | null,
  nomorKontak: string | null
): Promise<void> => {
  const { error } = await supabase
    .from('siswa')
    .update({
      nama: nama,
      kelas: kelas,
      alamat: alamat,
      tanggal_lahir: tanggalLahir,
      orang_tua_wali: orangTuaWali,
      nomor_kontak: nomorKontak,
    })
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};

export const deleteSiswa = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('siswa')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw error;
  }
};
