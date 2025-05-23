
import React, { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { adminLinks } from '@/constants/menuLinks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Pencil, Trash2, Filter } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

type Guru = {
  id: string;
  nama: string;
  bidang_studi: string | null;
  wali_kelas: string | null;
  nomor_kontak: string | null;
  created_at: string;
};

const KelolaGuru = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [guruList, setGuruList] = useState<Guru[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentGuru, setCurrentGuru] = useState<Guru | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    bidang_studi: '',
    wali_kelas: '',
    nomor_kontak: '',
  });

  useEffect(() => {
    fetchGuruList();
  }, []);

  const fetchGuruList = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('guru')
        .select('*')
        .order('nama');
        
      if (error) throw error;
      
      if (data) {
        setGuruList(data as Guru[]);
      }
    } catch (error) {
      console.error('Error fetching guru list:', error);
      toast.error('Gagal memuat daftar guru');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openAddDialog = () => {
    setFormData({
      nama: '',
      bidang_studi: '',
      wali_kelas: '',
      nomor_kontak: '',
    });
    setEditMode(false);
    setShowDialog(true);
  };

  const openEditDialog = (guru: Guru) => {
    setFormData({
      nama: guru.nama,
      bidang_studi: guru.bidang_studi || '',
      wali_kelas: guru.wali_kelas || '',
      nomor_kontak: guru.nomor_kontak || '',
    });
    setCurrentGuru(guru);
    setEditMode(true);
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && currentGuru) {
        // Update existing guru
        const { error } = await supabase
          .from('guru')
          .update({
            nama: formData.nama,
            bidang_studi: formData.bidang_studi || null,
            wali_kelas: formData.wali_kelas || null,
            nomor_kontak: formData.nomor_kontak || null,
          })
          .eq('id', currentGuru.id);
          
        if (error) throw error;
        
        toast.success('Data guru berhasil diperbarui');
      } else {
        // Add new guru
        const { error } = await supabase
          .from('guru')
          .insert({
            nama: formData.nama,
            bidang_studi: formData.bidang_studi || null,
            wali_kelas: formData.wali_kelas || null,
            nomor_kontak: formData.nomor_kontak || null,
            user_id: crypto.randomUUID(), // This is temporary; in a real app, you'd link to auth user
          });
          
        if (error) throw error;
        
        toast.success('Guru baru berhasil ditambahkan');
      }
      
      setShowDialog(false);
      fetchGuruList();
    } catch (error) {
      console.error('Error saving guru data:', error);
      toast.error('Gagal menyimpan data guru');
    }
  };

  const handleDeleteGuru = async (id: string) => {
    if (confirm('Anda yakin ingin menghapus guru ini?')) {
      try {
        const { error } = await supabase
          .from('guru')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        toast.success('Guru berhasil dihapus');
        fetchGuruList();
      } catch (error) {
        console.error('Error deleting guru:', error);
        toast.error('Gagal menghapus guru');
      }
    }
  };

  const filteredGuru = guruList.filter(guru => 
    guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (guru.bidang_studi && guru.bidang_studi.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (guru.wali_kelas && guru.wali_kelas.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="admin" links={adminLinks} />
      
      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Guru</h1>
            <p className="text-gray-600">Mengelola data guru di sistem</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Cari guru..."
                className="pl-9 w-full md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={openAddDialog} className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90 text-white">
              <Plus size={16} className="mr-2" />
              <span>Tambah Guru</span>
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daftar Guru</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p>Memuat data guru...</p>
              </div>
            ) : filteredGuru.length === 0 ? (
              <div className="text-center py-8">
                <p>Tidak ada guru yang ditemukan</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nama
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bidang Studi
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Wali Kelas
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nomor Kontak
                        </th>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredGuru.map((guru) => (
                        <tr key={guru.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-kesehatan-kuning/20 flex items-center justify-center text-kesehatan-kuning font-medium">
                                {guru.nama.charAt(0)}
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{guru.nama}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{guru.bidang_studi || '-'}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {guru.wali_kelas ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                Kelas {guru.wali_kelas}
                              </Badge>
                            ) : (
                              <span className="text-sm text-gray-500">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {guru.nomor_kontak || '-'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-blue-600"
                                onClick={() => openEditDialog(guru)}
                              >
                                <Pencil size={16} />
                                <span className="sr-only">Edit</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 text-red-600"
                                onClick={() => handleDeleteGuru(guru.id)}
                              >
                                <Trash2 size={16} />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editMode ? 'Edit Data Guru' : 'Tambah Guru Baru'}</DialogTitle>
            <DialogDescription>
              {editMode ? 'Perbarui informasi guru di sistem.' : 'Tambahkan guru baru ke dalam sistem.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nama" className="text-right">
                  Nama Lengkap
                </Label>
                <Input
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bidang_studi" className="text-right">
                  Bidang Studi
                </Label>
                <Input
                  id="bidang_studi"
                  name="bidang_studi"
                  value={formData.bidang_studi}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Contoh: Matematika"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="wali_kelas" className="text-right">
                  Wali Kelas
                </Label>
                <Select 
                  value={formData.wali_kelas} 
                  onValueChange={(value) => handleSelectChange('wali_kelas', value)}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Pilih Kelas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Bukan Wali Kelas</SelectItem>
                    <SelectItem value="6A">Kelas 6A</SelectItem>
                    <SelectItem value="6B">Kelas 6B</SelectItem>
                    <SelectItem value="5A">Kelas 5A</SelectItem>
                    <SelectItem value="5B">Kelas 5B</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nomor_kontak" className="text-right">
                  Nomor Kontak
                </Label>
                <Input
                  id="nomor_kontak"
                  name="nomor_kontak"
                  value={formData.nomor_kontak}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder="Contoh: 081234567890"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Batal
              </Button>
              <Button type="submit" className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90 text-white">
                {editMode ? 'Simpan Perubahan' : 'Tambah Guru'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KelolaGuru;
