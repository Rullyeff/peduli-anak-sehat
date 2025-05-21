import React, { useState } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Home, 
  ClipboardList, 
  MessageSquare, 
  History, 
  Activity 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { siswaLinks } from '@/constants/menuLinks';
import { supabase } from '@/integrations/supabase/client';

const DataKesehatan = () => {
  const [suhu, setSuhu] = useState('');
  const [beratBadan, setBeratBadan] = useState('');
  const [tinggiBadan, setTinggiBadan] = useState('');
  const [kondisi, setKondisi] = useState('sehat');
  const [keluhan, setKeluhan] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validasi input
    if (!suhu || !beratBadan || !tinggiBadan) {
      toast.error('Semua data kesehatan harian harus diisi!');
      setIsSubmitting(false);
      return;
    }

    if (kondisi === 'sakit' && !keluhan) {
      toast.error('Silakan jelaskan keluhan yang dialami');
      setIsSubmitting(false);
      return;
    }

    try {
      // Get current user data (in real implementation)
      // For demo, we'll use a fixed user ID
      const siswaId = "1"; // This would be the actual user ID from auth
      
      const { error } = await supabase
        .from('kesehatan_harian')
        .insert({
          siswa_id: siswaId,
          suhu_tubuh: parseFloat(suhu),
          berat_badan: parseFloat(beratBadan),
          tinggi_badan: parseFloat(tinggiBadan),
          status: kondisi, // Using status instead of kondisi to match DB schema
          keluhan: kondisi === 'sakit' ? keluhan : null,
        });

      if (error) throw error;

      toast.success('Data kesehatan berhasil disimpan');
      
      // Reset form setelah submit
      setSuhu('');
      setBeratBadan('');
      setTinggiBadan('');
      setKondisi('sehat');
      setKeluhan('');
    } catch (error) {
      console.error('Error saving health data:', error);
      toast.error('Gagal menyimpan data kesehatan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="siswa" links={siswaLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Isi Data Kesehatan</h1>
          <p className="text-gray-600">Isi data kesehatan harian Anda untuk dipantau oleh guru</p>
        </div>

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

              <Button 
                type="submit" 
                className="w-full bg-kesehatan-biru hover:bg-kesehatan-biru/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Menyimpan...' : 'Simpan Data Kesehatan'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DataKesehatan;
