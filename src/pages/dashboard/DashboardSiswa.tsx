import React, { useState } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Home, 
  ClipboardList, 
  History, 
  Activity, 
  MessageSquare 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { siswaLinks } from '@/constants/menuLinks';

const DashboardSiswa = () => {
  const [suhu, setSuhu] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [kondisi, setKondisi] = useState('sehat');
  const [keluhan, setKeluhan] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input
    if (!suhu || !beratBadan || !tinggiBadan) {
      toast.error('Semua data kesehatan harian harus diisi!');
      return;
    }

    if (kondisi === 'sakit' && !keluhan) {
      toast.error('Silakan jelaskan keluhan yang dialami');
      return;
    }

    // Demo submit - di implementasi nyata akan mengirim data ke backend
    toast.success('Data kesehatan berhasil disimpan');
    
    // Reset form setelah submit
    setSuhu('');
    setBeratBadan('');
    setTinggiBadan('');
    setKondisi('sehat');
    setKeluhan('');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="siswa" links={siswaLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Siswa</h1>
          <p className="text-gray-600">Selamat datang, Budi Santoso (Siswa Kelas 6A)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Form Data Kesehatan Harian</CardTitle>
              <CardDescription>
                Isi data kesehatan kamu untuk hari ini
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="suhu">Suhu Tubuh (°C)</Label>
                    <Input
                      id="suhu"
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 36.5"
                      value={suhu}
                      onChange={(e) => setSuhu(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="berat">Berat Badan (kg)</Label>
                    <Input
                      id="berat"
                      type="number"
                      step="0.1"
                      placeholder="Contoh: 35.5"
                      value={beratBadan}
                      onChange={(e) => setBeratBadan(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tinggi">Tinggi Badan (cm)</Label>
                  <Input
                    id="tinggi"
                    type="number"
                    step="0.1"
                    placeholder="Contoh: 150.5"
                    value={tinggiBadan}
                    onChange={(e) => setTinggiBadan(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Bagaimana kondisi kesehatanmu hari ini?</Label>
                  <RadioGroup 
                    value={kondisi} 
                    onValueChange={setKondisi}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sehat" id="sehat" />
                      <Label htmlFor="sehat">Sehat</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="sakit" id="sakit" />
                      <Label htmlFor="sakit">Kurang Sehat</Label>
                    </div>
                  </RadioGroup>
                </div>

                {kondisi === 'sakit' && (
                  <div className="space-y-2">
                    <Label htmlFor="keluhan">Jelaskan keluhanmu</Label>
                    <Textarea
                      id="keluhan"
                      placeholder="Contoh: Saya merasa pusing dan mual sejak pagi"
                      value={keluhan}
                      onChange={(e) => setKeluhan(e.target.value)}
                    />
                  </div>
                )}

                <Button type="submit" className="w-full bg-kesehatan-biru hover:bg-kesehatan-biru/90">
                  Simpan Data Kesehatan
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Respons dari Guru</CardTitle>
                <CardDescription>
                  Tanggapan dan saran dari guru terhadap keluhanmu
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-kesehatan-hijau flex items-center justify-center text-white font-semibold">
                      IH
                    </div>
                    <div>
                      <p className="font-semibold">Ibu Heni (Wali Kelas 6A)</p>
                      <p className="text-sm text-gray-500">Kemarin, 14:30</p>
                      <p className="mt-2 text-gray-700">
                        Budi, berdasarkan keluhan pusing dan mual yang kamu laporkan kemarin, sebaiknya kamu banyak istirahat dan minum air putih yang cukup. Jika masih berlanjut, sebaiknya periksakan ke dokter ya.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Ringkasan Kesehatanmu</CardTitle>
                <CardDescription>
                  Statistik kesehatan dalam 30 hari terakhir
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Rata-rata Suhu Tubuh</span>
                      <span className="font-medium">36.6°C</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-kesehatan-biru h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pertumbuhan Tinggi Badan</span>
                      <span className="font-medium">+2 cm</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-kesehatan-hijau h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Perkembangan Berat Badan</span>
                      <span className="font-medium">+1.5 kg</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-kesehatan-kuning h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Indeks Masa Tubuh (IMT)</span>
                      <span className="font-medium">Ideal</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-kesehatan-ungu h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSiswa;
