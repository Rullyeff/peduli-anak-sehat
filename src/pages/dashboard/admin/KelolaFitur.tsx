import React, { useState } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { adminLinks } from '@/constants/menuLinks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

const KelolaFitur = () => {
  console.log('KelolaFitur component rendered');
  
  const [features, setFeatures] = useState([
    {
      id: 1,
      title: 'Pencatatan Data Kesehatan',
      description: 'Siswa dapat mencatat data kesehatan harian seperti suhu tubuh, berat badan, dan tinggi badan secara mudah.',
      colorTheme: 'blue'
    },
    {
      id: 2,
      title: 'Komunikasi Dua Arah',
      description: 'Komunikasi langsung antara siswa dan guru untuk tanggapan cepat terhadap keluhan kesehatan.',
      colorTheme: 'green'
    },
    {
      id: 3,
      title: 'Analisis Data Kesehatan',
      description: 'Melihat tren kesehatan siswa dalam bentuk grafik dan laporan yang mudah dipahami.',
      colorTheme: 'yellow'
    }
  ]);

  const [editingFeature, setEditingFeature] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    colorTheme: 'blue'
  });

  const handleEdit = (feature: any) => {
    setEditingFeature(feature.id);
    setFormData({
      title: feature.title,
      description: feature.description,
      colorTheme: feature.colorTheme
    });
  };

  const handleSave = () => {
    if (!formData.title || !formData.description) {
      toast.error('Semua field harus diisi!');
      return;
    }

    setFeatures(prev => prev.map(feature => 
      feature.id === editingFeature 
        ? { ...feature, ...formData }
        : feature
    ));

    setEditingFeature(null);
    setFormData({ title: '', description: '', colorTheme: 'blue' });
    toast.success('Fitur berhasil diupdate!');
  };

  const handleCancel = () => {
    setEditingFeature(null);
    setFormData({ title: '', description: '', colorTheme: 'blue' });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="admin" links={adminLinks} />
      
      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Kelola Fitur Homepage</h1>
          <p className="text-gray-600">Mengelola fitur yang ditampilkan di halaman utama</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Daftar Fitur</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {features.map((feature) => (
                  <div key={feature.id} className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs ${
                        feature.colorTheme === 'blue' ? 'bg-blue-100 text-blue-800' :
                        feature.colorTheme === 'green' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {feature.colorTheme}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(feature)}
                      >
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {editingFeature && (
            <Card>
              <CardHeader>
                <CardTitle>Edit Fitur</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Judul Fitur</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Masukkan judul fitur"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Deskripsi</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Masukkan deskripsi fitur"
                      rows={4}
                    />
                  </div>

                  <div>
                    <Label htmlFor="colorTheme">Tema Warna</Label>
                    <Select 
                      value={formData.colorTheme} 
                      onValueChange={(value) => {
                        console.log('KelolaFitur: Select value changed to:', value);
                        setFormData(prev => ({ ...prev, colorTheme: value }))
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="blue">Biru</SelectItem>
                        <SelectItem value="green">Hijau</SelectItem>
                        <SelectItem value="yellow">Kuning</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="flex-1">
                      Simpan
                    </Button>
                    <Button variant="outline" onClick={handleCancel} className="flex-1">
                      Batal
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default KelolaFitur;
