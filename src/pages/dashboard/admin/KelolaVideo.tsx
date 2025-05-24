
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { adminLinks } from '@/constants/menuLinks';
import { VideoTable } from '@/components/admin/video/VideoTable';
import { VideoForm } from '@/components/admin/video/VideoForm';
import { Video } from '@/types/video';
import { 
  fetchAllVideos,
  createVideo,
  updateVideo,
  deleteVideo
} from '@/services/videoService';

const KelolaVideo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  
  const queryClient = useQueryClient();
  
  // Form state
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    url: '',
    kategori: '',
    thumbnail: '',
    durasi: '',
  });

  // Fetch videos using React Query
  const { data: videos = [], isLoading } = useQuery({
    queryKey: ['videos'],
    queryFn: fetchAllVideos,
  });

  // Create video mutation
  const createMutation = useMutation({
    mutationFn: ({ judul, deskripsi, url, kategori, thumbnail, durasi }: {
      judul: string;
      deskripsi: string;
      url: string;
      kategori: string;
      thumbnail?: string;
      durasi?: string;
    }) => createVideo(judul, deskripsi, url, kategori, thumbnail, durasi),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast.success('Video baru berhasil ditambahkan');
      setShowDialog(false);
      resetForm();
    },
    onError: (error) => {
      console.error('Error creating video:', error);
      toast.error('Gagal menambahkan video');
    },
  });

  // Update video mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, judul, deskripsi, url, kategori, thumbnail, durasi }: {
      id: string;
      judul: string;
      deskripsi: string;
      url: string;
      kategori: string;
      thumbnail?: string;
      durasi?: string;
    }) => updateVideo(id, judul, deskripsi, url, kategori, thumbnail, durasi),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast.success('Video berhasil diperbarui');
      setShowDialog(false);
      resetForm();
    },
    onError: (error) => {
      console.error('Error updating video:', error);
      toast.error('Gagal memperbarui video');
    },
  });

  // Delete video mutation
  const deleteMutation = useMutation({
    mutationFn: deleteVideo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['videos'] });
      toast.success('Video berhasil dihapus');
    },
    onError: (error) => {
      console.error('Error deleting video:', error);
      toast.error('Gagal menghapus video');
    },
  });

  const resetForm = () => {
    setFormData({
      judul: '',
      deskripsi: '',
      url: '',
      kategori: '',
      thumbnail: '',
      durasi: '',
    });
    setCurrentVideo(null);
    setEditMode(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const openAddDialog = () => {
    resetForm();
    setShowDialog(true);
  };

  const openEditDialog = (video: Video) => {
    setFormData({
      judul: video.judul,
      deskripsi: video.deskripsi,
      url: video.url,
      kategori: video.kategori,
      thumbnail: video.thumbnail || '',
      durasi: video.durasi || '',
    });
    setCurrentVideo(video);
    setEditMode(true);
    setShowDialog(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editMode && currentVideo) {
      updateMutation.mutate({
        id: currentVideo.id,
        judul: formData.judul,
        deskripsi: formData.deskripsi,
        url: formData.url,
        kategori: formData.kategori,
        thumbnail: formData.thumbnail || undefined,
        durasi: formData.durasi || undefined,
      });
    } else {
      createMutation.mutate({
        judul: formData.judul,
        deskripsi: formData.deskripsi,
        url: formData.url,
        kategori: formData.kategori,
        thumbnail: formData.thumbnail || undefined,
        durasi: formData.durasi || undefined,
      });
    }
  };

  const handleDeleteVideo = (id: string) => {
    if (confirm('Anda yakin ingin menghapus video ini?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="admin" links={adminLinks} />
      
      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Video Edukasi</h1>
            <p className="text-gray-600">Mengelola video edukasi untuk siswa</p>
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Cari video..."
                className="pl-9 w-full md:w-[260px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button onClick={openAddDialog} className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90 text-white">
              <Plus size={16} className="mr-2" />
              <span>Tambah Video</span>
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Daftar Video Edukasi</CardTitle>
          </CardHeader>
          <CardContent>
            <VideoTable 
              videos={videos} 
              isLoading={isLoading} 
              searchTerm={searchTerm}
              onEdit={openEditDialog}
              onDelete={handleDeleteVideo}
            />
          </CardContent>
        </Card>
      </div>
      
      <VideoForm
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

export default KelolaVideo;
