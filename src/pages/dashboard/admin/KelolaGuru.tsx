
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { adminLinks } from '@/constants/menuLinks';
import { GuruTable } from '@/components/admin/guru/GuruTable';
import { GuruForm } from '@/components/admin/guru/GuruForm';
import { Guru } from '@/types/guru';
import { 
  fetchAllGuru,
  createGuru,
  updateGuru,
  deleteGuru
} from '@/services/guruService';

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
    loadGuruData();
  }, []);

  const loadGuruData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllGuru();
      setGuruList(data);
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
      wali_kelas: 'none',
      nomor_kontak: '',
    });
    setEditMode(false);
    setShowDialog(true);
  };

  const openEditDialog = (guru: Guru) => {
    setFormData({
      nama: guru.nama,
      bidang_studi: guru.bidang_studi || '',
      wali_kelas: guru.wali_kelas || 'none', // Convert null to "none" for the select
      nomor_kontak: guru.nomor_kontak || '',
    });
    setCurrentGuru(guru);
    setEditMode(true);
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Convert "none" back to null for database storage
      const waliKelasValue = formData.wali_kelas === 'none' ? null : formData.wali_kelas;
      
      if (editMode && currentGuru) {
        // Update existing guru
        await updateGuru(
          currentGuru.id,
          formData.nama,
          formData.bidang_studi || null,
          waliKelasValue,
          formData.nomor_kontak || null
        );
        toast.success('Data guru berhasil diperbarui');
      } else {
        // Add new guru
        await createGuru(
          formData.nama,
          formData.bidang_studi || null,
          waliKelasValue,
          formData.nomor_kontak || null
        );
        toast.success('Guru baru berhasil ditambahkan');
      }
      
      setShowDialog(false);
      loadGuruData();
    } catch (error) {
      console.error('Error saving guru data:', error);
      toast.error('Gagal menyimpan data guru');
    }
  };

  const handleDeleteGuru = async (id: string) => {
    if (confirm('Anda yakin ingin menghapus guru ini?')) {
      try {
        await deleteGuru(id);
        toast.success('Guru berhasil dihapus');
        loadGuruData();
      } catch (error) {
        console.error('Error deleting guru:', error);
        toast.error('Gagal menghapus guru');
      }
    }
  };

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
            <GuruTable 
              guruList={guruList} 
              isLoading={isLoading} 
              searchTerm={searchTerm}
              onEdit={openEditDialog}
              onDelete={handleDeleteGuru}
            />
          </CardContent>
        </Card>
      </div>
      
      <GuruForm
        showDialog={showDialog}
        setShowDialog={setShowDialog}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
        handleSubmit={handleSubmit}
        editMode={editMode}
      />
    </div>
  );
};

export default KelolaGuru;
