
import React, { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Home, 
  ClipboardList, 
  MessageSquare, 
  History, 
  Activity,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { siswaLinks } from '@/constants/menuLinks';
import { supabase } from '@/integrations/supabase/client';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface StatData {
  date: string;
  suhu: number;
  berat: number;
  tinggi: number;
}

const Statistik = () => {
  const [timeframe, setTimeframe] = useState('bulan');
  const [chartData, setChartData] = useState<StatData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    avgSuhu: 0,
    avgBerat: 0,
    avgTinggi: 0,
    growthTinggi: 0,
    growthBerat: 0,
    imt: 0,
    imtCategory: 'Normal'
  });

  useEffect(() => {
    fetchStatistics(timeframe);
  }, [timeframe]);

  const fetchStatistics = async (period: string) => {
    try {
      setIsLoading(true);
      
      // For demo - in real app use the authenticated user
      const siswaId = 1;
      
      // Create appropriate date range filter
      const now = new Date();
      let startDate = new Date();
      
      switch (period) {
        case 'minggu':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'bulan':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'semester':
          startDate.setMonth(now.getMonth() - 6);
          break;
        case 'tahun':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }
      
      const { data, error } = await supabase
        .from('kesehatan_harian')
        .select('*')
        .eq('siswa_id', siswaId)
        .gte('created_at', startDate.toISOString())
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        // Process data for charts
        const formattedData = data.map(item => ({
          date: new Date(item.created_at).toLocaleDateString('id-ID', { 
            day: '2-digit', 
            month: 'short'
          }),
          suhu: item.suhu_tubuh,
          berat: item.berat_badan,
          tinggi: item.tinggi_badan
        }));
        
        setChartData(formattedData);
        
        // Calculate statistics
        const avgSuhu = data.reduce((sum, item) => sum + item.suhu_tubuh, 0) / data.length;
        const avgBerat = data.reduce((sum, item) => sum + item.berat_badan, 0) / data.length;
        const avgTinggi = data.reduce((sum, item) => sum + item.tinggi_badan, 0) / data.length;
        
        // Calculate growth if there's more than one data point
        let growthTinggi = 0;
        let growthBerat = 0;
        
        if (data.length > 1) {
          const firstRecord = data[0];
          const lastRecord = data[data.length - 1];
          
          growthTinggi = lastRecord.tinggi_badan - firstRecord.tinggi_badan;
          growthBerat = lastRecord.berat_badan - firstRecord.berat_badan;
        }
        
        // Calculate IMT (BMI) from latest record
        const latestRecord = data[data.length - 1];
        const heightInMeters = latestRecord.tinggi_badan / 100;
        const imt = latestRecord.berat_badan / (heightInMeters * heightInMeters);
        
        // Determine IMT category (simplified for children)
        let imtCategory;
        if (imt < 18.5) imtCategory = 'Kurus';
        else if (imt >= 18.5 && imt < 25) imtCategory = 'Normal';
        else if (imt >= 25 && imt < 30) imtCategory = 'Gemuk';
        else imtCategory = 'Obesitas';
        
        setStats({
          avgSuhu,
          avgBerat,
          avgTinggi,
          growthTinggi,
          growthBerat,
          imt,
          imtCategory
        });
      } else {
        // No data
        setChartData([]);
        setStats({
          avgSuhu: 0,
          avgBerat: 0,
          avgTinggi: 0,
          growthTinggi: 0,
          growthBerat: 0,
          imt: 0,
          imtCategory: 'Tidak Ada Data'
        });
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
      toast.error('Gagal memuat data statistik kesehatan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="siswa" links={siswaLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Statistik Kesehatan</h1>
            <p className="text-gray-600">Visualisasi perkembangan kesehatan Anda</p>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {timeframe === 'minggu' && 'Seminggu Terakhir'}
                {timeframe === 'bulan' && 'Sebulan Terakhir'}
                {timeframe === 'semester' && 'Semester Ini'}
                {timeframe === 'tahun' && 'Setahun Terakhir'}
                <ChevronDown size={14} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTimeframe('minggu')}>
                Seminggu Terakhir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeframe('bulan')}>
                Sebulan Terakhir
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeframe('semester')}>
                Semester Ini
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTimeframe('tahun')}>
                Setahun Terakhir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Suhu Tubuh Rata-rata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgSuhu.toFixed(1)}°C</div>
              <p className="text-xs text-gray-500">Dari {chartData.length} pengukuran</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Berat Badan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgBerat.toFixed(1)} kg</div>
              <p className="text-xs text-gray-500 flex items-center">
                {stats.growthBerat > 0 ? (
                  <span className="text-green-600">+{stats.growthBerat.toFixed(1)} kg</span>
                ) : stats.growthBerat < 0 ? (
                  <span className="text-red-600">{stats.growthBerat.toFixed(1)} kg</span>
                ) : (
                  <span>Tidak ada perubahan</span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Tinggi Badan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgTinggi.toFixed(1)} cm</div>
              <p className="text-xs text-gray-500 flex items-center">
                {stats.growthTinggi > 0 ? (
                  <span className="text-green-600">+{stats.growthTinggi.toFixed(1)} cm</span>
                ) : stats.growthTinggi < 0 ? (
                  <span className="text-red-600">{stats.growthTinggi.toFixed(1)} cm</span>
                ) : (
                  <span>Tidak ada perubahan</span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Index Massa Tubuh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.imt.toFixed(1)}</div>
              <p className={`text-xs ${
                stats.imtCategory === 'Normal' ? 'text-green-600' :
                stats.imtCategory === 'Kurus' ? 'text-amber-600' :
                stats.imtCategory === 'Tidak Ada Data' ? 'text-gray-500' :
                'text-red-600'
              }`}>
                {stats.imtCategory}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Grafik Suhu Tubuh</CardTitle>
              <CardDescription>Perkembangan suhu tubuh dari waktu ke waktu</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <p>Memuat data...</p>
                </div>
              ) : chartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p>Tidak ada data untuk ditampilkan</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[35, 40]} />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="suhu" 
                      name="Suhu (°C)" 
                      stroke="#3b82f6" 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Berat dan Tinggi Badan</CardTitle>
              <CardDescription>Perbandingan berat dan tinggi badan dari waktu ke waktu</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <p>Memuat data...</p>
                </div>
              ) : chartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-gray-500">
                  <p>Tidak ada data untuk ditampilkan</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar 
                      yAxisId="left"
                      dataKey="berat" 
                      name="Berat (kg)" 
                      fill="#22c55e" 
                    />
                    <Bar 
                      yAxisId="right"
                      dataKey="tinggi" 
                      name="Tinggi (cm)" 
                      fill="#f59e0b" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>IMT dan Kesehatan</CardTitle>
            <CardDescription>
              Indeks Massa Tubuh (IMT) adalah pengukuran yang digunakan untuk mengetahui status gizi seseorang.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Kategori IMT untuk Anak:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                    <p className="font-medium text-blue-800">Kurus</p>
                    <p className="text-sm text-blue-600">IMT &lt; 18.5</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-50 border border-green-100">
                    <p className="font-medium text-green-800">Normal</p>
                    <p className="text-sm text-green-600">IMT 18.5 - 24.9</p>
                  </div>
                  <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                    <p className="font-medium text-amber-800">Gemuk</p>
                    <p className="text-sm text-amber-600">IMT 25 - 29.9</p>
                  </div>
                  <div className="p-3 rounded-lg bg-red-50 border border-red-100">
                    <p className="font-medium text-red-800">Obesitas</p>
                    <p className="text-sm text-red-600">IMT &gt; 30</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Tips Menjaga Berat Badan Ideal:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Makan makanan seimbang dengan banyak buah dan sayur</li>
                  <li>Batasi makanan dan minuman yang manis dan berlemak</li>
                  <li>Lakukan aktivitas fisik secara teratur</li>
                  <li>Cukup istirahat dan tidur</li>
                  <li>Minum air putih yang cukup setiap hari</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistik;
