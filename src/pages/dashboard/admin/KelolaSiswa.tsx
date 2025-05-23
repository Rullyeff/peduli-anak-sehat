
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { adminLinks } from '@/constants/menuLinks';
import { SiswaTable } from '@/components/admin/siswa/SiswaTable';
import { SiswaForm } from '@/components/admin/siswa/SiswaForm';
import { Siswa } from '@/types/siswa';
import { 
  fetchAllSiswa,
  createSiswa,
  updateSiswa,
  deleteSiswa
} from '@/services/siswaService';

const KelolaSiswa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [siswaList, setSiswaList] = useState<Siswa[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentSiswa, setCurrentSiswa] = useState<Siswa | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    alamat: '',
    tanggal_lahir: '',
    orang_tua_wali: '',
    nomor_kontak: '',
  });

  useEffect(() => {
    loadSiswaData();
  }, []);

  const loadSiswaData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllSiswa();
      setSiswaList(data);
    } catch (error) {
      console.error('Error fetching siswa list:', error);
      toast.error('Gagal memuat daftar siswa');
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
      kelas: '',
      alamat: '',
      tanggal_lahir: '',
      orang_tua_wali: '',
      nomor_kontak: '',
    });
    setEditMode(false);
    setShowDialog(true);
  };

  const openEditDialog = (siswa: Siswa) => {
    setFormData({
      nama: siswa.nama,
      kelas: siswa.kelas,
      alamat: siswa.alamat || '',
      tanggal_lahir: siswa.tanggal_lahir || '',
      orang_tua_wali: siswa.orang_tua_wali || '',
      nomor_kontak: siswa.nomor_kontak || '',
    });
    setCurrentSiswa(siswa);
    setEditMode(true);
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editMode && currentSiswa) {
        // Update existing siswa
        await updateSiswa(
          currentSiswa.id,
          formData.nama,
          formData.kelas,
          formData.alamat || null,
          formData.tanggal_lahir || null,
          formData.orang_tua_wali || null,
          formData.nomor_kontak || null
        );
        toast.success('Data siswa berhasil diperbarui');
      } else {
        // Add new siswa
        await createSiswa(
          formData.nama,
          formData.kelas,
          formData.alamat || null,
          formData.tanggal_lahir || null,
          formData.orang_tua_wali || null,
          formData.nomor_kontak || null
        );
        toast.success('Siswa baru berhasil ditambahkan');
      }
      
      setShowDialog(false);
      loadSiswaData();
    } catch (error) {
      console.error('Error saving siswa data:', error);
      toast.error('Gagal menyimpan data siswa');
    }
  };

  const handleDeleteSiswa = async (id: string) => {
    if (confirm('Anda yakin ingin menghapus siswa ini?')) {
      try {
        await deleteSiswa(id);
        toast.success('Siswa berhasil dihapus');
        loadSiswaData();
      } catch (error) {
        console.error('Error deleting siswa:', error);
        toast.error('Gagal menghapus siswa');
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="admin" links={adminLinks} />
      
      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Siswa</h1>
            <p className="text-gray-600">Mengelola data siswa di sistem</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Cari siswa..."
                className="pl-9 w-full md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={openAddDialog} className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90 text-white">
              <Plus size={16} className="mr-2" />
              <span>Tambah Siswa</span>
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daftar Siswa</CardTitle>
          </CardHeader>
          <CardContent>
            <SiswaTable 
              siswaList={siswaList} 
              isLoading={isLoading} 
              searchTerm={searchTerm}
              onEdit={openEditDialog}
              onDelete={handleDeleteSiswa}
            />
          </CardContent>
        </Card>
      </div>
      
      <SiswaForm
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

export default KelolaSiswa;
