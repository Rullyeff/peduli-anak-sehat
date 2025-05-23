
import React, { useState } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { guruLinks } from '@/constants/menuLinks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Trash2, Plus } from 'lucide-react';

const KelolaVideo = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: 'Cara Mencuci Tangan yang Benar',
      description: 'Video edukasi tentang langkah-langkah mencuci tangan yang benar untuk mencegah penyakit',
      youtubeUrl: 'https://www.youtube.com/watch?v=example1',
      kelas: '6A',
      active: true
    },
    {
      id: 2,
      title: 'Pentingnya Menjaga Kebersihan Gigi',
      description: 'Tips dan cara menjaga kesehatan gigi dan mulut untuk anak-anak',
      youtubeUrl: 'https://www.youtube.com/watch?v=example2',
      kelas: '6A',
      active: true
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    youtubeUrl: '',
    kelas: '6A'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.youtubeUrl) {
      toast.error('Semua field harus diisi!');
      return;
    }

    if (!formData.youtubeUrl.includes('youtube.com/watch') && !formData.youtubeUrl.includes('youtu.be/')) {
      toast.error('URL YouTube tidak valid!');
      return;
    }

    if (editingVideo) {
      setVideos(prev => prev.map(video => 
        video.id === editingVideo 
          ? { ...video, ...formData }
          : video
      ));
      toast.success('Video berhasil diupdate!');
    } else {
      const newVideo = {
        id: Date.now(),
        ...formData,
        active: true
      };
      setVideos(prev => [...prev, newVideo]);
      toast.success('Video berhasil ditambahkan!');
    }

    setFormData({ title: '', description: '', youtubeUrl: '', kelas: '6A' });
    setShowForm(false);
    setEditingVideo(null);
  };

  const handleEdit = (video: any) => {
    setFormData({
      title: video.title,
      description: video.description,
      youtubeUrl: video.youtubeUrl,
      kelas: video.kelas
    });
    setEditingVideo(video.id);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setVideos(prev => prev.filter(video => video.id !== id));
    toast.success('Video berhasil dihapus!');
  };

  const toggleActive = (id: number) => {
    setVideos(prev => prev.map(video => 
      video.id === id 
        ? { ...video, active: !video.active }
        : video
    ));
    toast.success('Status video berhasil diubah!');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="guru" links={guruLinks} />
      
      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kelola Video Edukasi</h1>
            <p className="text-gray-600">Mengelola video YouTube untuk siswa</p>
          </div>
          <Button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Tambah Video
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{video.title}</h3>
                      <span className={`px-2 py-1 rounded text-xs ${
                        video.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {video.active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{video.description}</p>
                    <p className="text-xs text-blue-600 mb-3">{video.youtubeUrl}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Kelas: {video.kelas}</span>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => toggleActive(video.id)}
                        >
                          {video.active ? 'Nonaktifkan' : 'Aktifkan'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEdit(video)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDelete(video.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>{editingVideo ? 'Edit Video' : 'Tambah Video Baru'}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Judul Video</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Masukkan judul video"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Masukkan deskripsi video"
                      rows={3}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="youtubeUrl">URL YouTube</Label>
                    <Input
                      id="youtubeUrl"
                      value={formData.youtubeUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                      placeholder="https://www.youtube.com/watch?v=..."
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="kelas">Kelas</Label>
                    <Select 
                      value={formData.kelas} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, kelas: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6A">Kelas 6A</SelectItem>
                        <SelectItem value="6B">Kelas 6B</SelectItem>
                        <SelectItem value="5A">Kelas 5A</SelectItem>
                        <SelectItem value="5B">Kelas 5B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="flex-1">
                      {editingVideo ? 'Update' : 'Tambah'} Video
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => {
                        setShowForm(false);
                        setEditingVideo(null);
                        setFormData({ title: '', description: '', youtubeUrl: '', kelas: '6A' });
                      }}
                      className="flex-1"
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default KelolaVideo;
