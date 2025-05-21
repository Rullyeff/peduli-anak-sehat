
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { siswaLinks } from '@/constants/menuLinks';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Activity, Thermometer, Weight, ArrowUpDown } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { HealthRecord } from '@/types';

interface KesehatanHarian {
  id: string;
  siswa_id: string;
  suhu_tubuh: number;
  berat_badan: number;
  tinggi_badan: number;
  status: string;
  keluhan: string | null;
  catatan: string | null;
  created_at: string;
  updated_at: string;
  tanggal: string;
}

const Riwayat = () => {
  const [riwayat, setRiwayat] = useState<HealthRecord[]>([]);
  const [filter, setFilter] = useState('all');
  const [bulan, setBulan] = useState(new Date().getMonth() + 1);
  const [tahun, setTahun] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const userId = '1'; // This would come from authentication context

  const fetchRiwayatKesehatan = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('kesehatan_harian')
        .select('*')
        .eq('siswa_id', userId)
        .gte('tanggal', `${tahun}-${bulan.toString().padStart(2, '0')}-01`)
        .lte('tanggal', `${tahun}-${bulan.toString().padStart(2, '0')}-31`)
        .order('tanggal', { ascending: false });

      if (error) throw error;

      if (data) {
        // Transform the data to match the HealthRecord interface
        const formattedRecords: HealthRecord[] = data.map((item: KesehatanHarian) => ({
          id: item.id,
          siswa_id: item.siswa_id,
          suhu_tubuh: item.suhu_tubuh,
          berat_badan: item.berat_badan,
          tinggi_badan: item.tinggi_badan,
          status: item.status,
          keluhan: item.keluhan,
          created_at: item.created_at,
          tanggal: item.tanggal
        }));

        setRiwayat(formattedRecords);
      }
    } catch (error) {
      console.error('Error fetching riwayat kesehatan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRiwayatKesehatan();
  }, [bulan, tahun]);

  const handlePrevMonth = () => {
    if (bulan === 1) {
      setBulan(12);
      setTahun(tahun - 1);
    } else {
      setBulan(bulan - 1);
    }
  };

  const handleNextMonth = () => {
    if (bulan === 12) {
      setBulan(1);
      setTahun(tahun + 1);
    } else {
      setBulan(bulan + 1);
    }
  };

  const filteredRiwayat = filter === 'all' 
    ? riwayat 
    : riwayat.filter(item => item.status === filter);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="siswa" links={siswaLinks} />

      <div className="flex-1 p-6 pt-6 lg:p-8 ml-0 md:ml-64">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Riwayat Kesehatan</h1>

        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>Catatan Kesehatan Harian</CardTitle>
                  <CardDescription>
                    Riwayat pencatatan kesehatan Anda
                  </CardDescription>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="flex items-center px-2">
                      <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                      <span>{format(new Date(tahun, bulan - 1, 1), 'MMMM yyyy', { locale: id })}</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={handleNextMonth}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>

                  <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[130px]">
                      <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Status</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="warning">Perlu Perhatian</SelectItem>
                      <SelectItem value="danger">Perlu Tindakan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Memuat data...</p>
                </div>
              ) : filteredRiwayat.length > 0 ? (
                <div className="space-y-4">
                  {filteredRiwayat.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div className="flex items-center">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            item.status === 'normal' 
                              ? 'bg-green-100 text-green-700' 
                              : item.status === 'warning'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-red-100 text-red-700'
                          }`}>
                            <Activity className="h-5 w-5" />
                          </div>
                          <div className="ml-3">
                            <p className="font-medium">
                              {format(new Date(item.tanggal), 'EEEE, d MMMM yyyy', { locale: id })}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(item.created_at), 'HH:mm', { locale: id })} WIB
                            </p>
                          </div>
                        </div>

                        <Badge className={
                          item.status === 'normal' 
                            ? 'bg-green-100 text-green-800 hover:bg-green-100'
                            : item.status === 'warning' 
                              ? 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                              : 'bg-red-100 text-red-800 hover:bg-red-100'
                        }>
                          {item.status === 'normal' 
                            ? 'Normal' 
                            : item.status === 'warning'
                              ? 'Perlu Perhatian'
                              : 'Perlu Tindakan'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <Thermometer className="h-5 w-5 text-blue-600 mr-2" />
                          <div>
                            <p className="text-sm text-gray-500">Suhu Tubuh</p>
                            <p className="font-medium">{item.suhu_tubuh}°C</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <Weight className="h-5 w-5 text-indigo-600 mr-2" />
                          <div>
                            <p className="text-sm text-gray-500">Berat Badan</p>
                            <p className="font-medium">{item.berat_badan} kg</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center p-3 bg-gray-50 rounded-md">
                          <ArrowUpDown className="h-5 w-5 text-purple-600 mr-2" />
                          <div>
                            <p className="text-sm text-gray-500">Tinggi Badan</p>
                            <p className="font-medium">{item.tinggi_badan} cm</p>
                          </div>
                        </div>
                      </div>

                      {item.keluhan && (
                        <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mb-2">
                          <p className="text-sm font-medium text-blue-700 mb-1">Keluhan:</p>
                          <p className="text-gray-700">{item.keluhan}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 border rounded-lg">
                  <Activity className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">Belum ada data kesehatan untuk bulan ini</p>
                  <Button className="mt-4 bg-kesehatan-biru hover:bg-kesehatan-biru/90">
                    Isi Data Kesehatan
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Riwayat;
