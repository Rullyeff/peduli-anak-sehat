
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search } from 'lucide-react';
import { toast } from 'sonner';
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
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    judul: '',
    deskripsi: '',
    url: '',
    kategori: '',
    thumbnail: '',
    durasi: '',
  });

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      setIsLoading(true);
      const data = await fetchAllVideos();
      setVideos(data);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast.error('Gagal memuat daftar video');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      judul: '',
      deskripsi: '',
      url: '',
      kategori: '',
      thumbnail: '',
      durasi: '',
    });
    setEditMode(false);
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
    try {
      if (editMode && currentVideo) {
        // Update existing video
        await updateVideo(
          currentVideo.id,
          formData.judul,
          formData.deskripsi,
          formData.url,
          formData.kategori,
          formData.thumbnail || undefined,
          formData.durasi || undefined
        );
        toast.success('Video berhasil diperbarui');
      } else {
        // Add new video
        await createVideo(
          formData.judul,
          formData.deskripsi,
          formData.url,
          formData.kategori,
          formData.thumbnail || undefined,
          formData.durasi || undefined
        );
        toast.success('Video baru berhasil ditambahkan');
      }
      
      setShowDialog(false);
      loadVideos();
    } catch (error) {
      console.error('Error saving video:', error);
      toast.error('Gagal menyimpan video');
    }
  };

  const handleDeleteVideo = async (id: string) => {
    if (confirm('Anda yakin ingin menghapus video ini?')) {
      try {
        await deleteVideo(id);
        toast.success('Video berhasil dihapus');
        loadVideos();
      } catch (error) {
        console.error('Error deleting video:', error);
        toast.error('Gagal menghapus video');
      }
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
