
import React, { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Home, 
  ClipboardList, 
  MessageSquare, 
  History, 
  Activity,
  Calendar,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { siswaLinks } from '@/constants/menuLinks';
import { supabase } from '@/integrations/supabase/client';

interface KesehatanHarian {
  id: string;
  siswa_id: string;
  suhu_tubuh: number;
  berat_badan: number;
  tinggi_badan: number;
  status: string;
  keluhan: string | null;
  created_at: string;
  updated_at: string;
  tanggal: string;
  catatan: string | null;
}

const Riwayat = () => {
  const [healthRecords, setHealthRecords] = useState<KesehatanHarian[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('seminggu');

  useEffect(() => {
    fetchHealthRecords(filter);
  }, [filter]);

  const fetchHealthRecords = async (timeFrame: string) => {
    try {
      setIsLoading(true);
      
      // For demo purposes - in a real app use the authenticated user's ID
      const siswaId = "1";
      
      let query = supabase
        .from('kesehatan_harian')
        .select('*')
        .eq('siswa_id', siswaId)
        .order('created_at', { ascending: false });
      
      // Apply time filter
      const now = new Date();
      let startDate;
      
      switch (timeFrame) {
        case 'seminggu':
          startDate = new Date(now);
          startDate.setDate(now.getDate() - 7);
          query = query.gte('created_at', startDate.toISOString());
          break;
        case 'sebulan':
          startDate = new Date(now);
          startDate.setMonth(now.getMonth() - 1);
          query = query.gte('created_at', startDate.toISOString());
          break;
        case 'semester':
          startDate = new Date(now);
          startDate.setMonth(now.getMonth() - 6);
          query = query.gte('created_at', startDate.toISOString());
          break;
        // 'semua' doesn't need filtering
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      setHealthRecords(data || []);
    } catch (error) {
      console.error('Error fetching health records:', error);
      toast.error('Gagal memuat data riwayat kesehatan');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const handleExport = () => {
    // In a real app, implement CSV export functionality
    toast.success('Data berhasil diunduh');
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="siswa" links={siswaLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Riwayat Kesehatan</h1>
          <p className="text-gray-600">Lihat rekap data kesehatan Anda selama ini</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Calendar size={18} className="text-kesehatan-biru" />
            <span className="font-medium">Filter Periode:</span>
          </div>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="seminggu">Seminggu Terakhir</SelectItem>
                <SelectItem value="sebulan">Sebulan Terakhir</SelectItem>
                <SelectItem value="semester">Semester Ini</SelectItem>
                <SelectItem value="semua">Semua Riwayat</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="flex gap-2" onClick={handleExport}>
              <Download size={16} />
              <span>Unduh</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Data Riwayat Kesehatan</CardTitle>
            <CardDescription>
              Riwayat data kesehatan harian yang telah Anda isi
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <p>Memuat data...</p>
              </div>
            ) : healthRecords.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada data kesehatan dalam periode ini</p>
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="py-3 px-4 text-left font-medium">Tanggal</th>
                        <th className="py-3 px-4 text-left font-medium">Suhu Tubuh</th>
                        <th className="py-3 px-4 text-left font-medium">Berat Badan</th>
                        <th className="py-3 px-4 text-left font-medium">Tinggi Badan</th>
                        <th className="py-3 px-4 text-left font-medium">Kondisi</th>
                        <th className="py-3 px-4 text-left font-medium">Keluhan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {healthRecords.map((record) => (
                        <tr key={record.id} className="hover:bg-gray-50">
                          <td className="p-4">{formatDate(record.created_at)}</td>
                          <td className="p-4">{record.suhu_tubuh}°C</td>
                          <td className="p-4">{record.berat_badan} kg</td>
                          <td className="p-4">{record.tinggi_badan} cm</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              record.kondisi === 'sehat' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {record.kondisi === 'sehat' ? 'Sehat' : 'Kurang Sehat'}
                            </span>
                          </td>
                          <td className="p-4">
                            {record.keluhan || <span className="text-gray-400">-</span>}
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
    </div>
  );
};

export default Riwayat;
