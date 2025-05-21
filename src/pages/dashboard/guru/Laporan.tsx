
import React, { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Home, 
  Users, 
  MessageSquare, 
  FileText, 
  Bell,
  Calendar,
  ChevronDown,
  Download,
  Printer
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { guruLinks } from '@/constants/menuLinks';
import { supabase } from '@/integrations/supabase/client';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const Laporan = () => {
  const [selectedClass, setSelectedClass] = useState('6A');
  const [timeframe, setTimeframe] = useState('minggu');
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState({
    totalStudents: 0,
    healthyCount: 0,
    sickCount: 0,
    absentCount: 0,
    healthIssues: [],
    attendanceRate: 0,
    chartData: [],
    healthTrend: []
  });

  useEffect(() => {
    fetchReportData();
  }, [selectedClass, timeframe]);

  const fetchReportData = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, fetch actual data from your database
      // For this demo, we're simulating the data
      
      // Simulated data
      const totalStudents = 25;
      const healthyCount = 19;
      const sickCount = 4;
      const absentCount = 2;
      const attendanceRate = ((totalStudents - absentCount) / totalStudents) * 100;
      
      const healthIssues = [
        { name: 'Demam', count: 2, percentage: 8 },
        { name: 'Batuk & Pilek', count: 3, percentage: 12 },
        { name: 'Sakit Perut', count: 1, percentage: 4 },
        { name: 'Pusing', count: 1, percentage: 4 },
      ];
      
      // Generate chart data
      const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
      const chartData = days.map(day => ({
        name: day,
        sehat: Math.floor(Math.random() * 5) + 15,
        sakit: Math.floor(Math.random() * 5) + 2,
        absen: Math.floor(Math.random() * 3)
      }));
      
      // Generate health trend data
      const healthTrend = days.map(day => ({
        name: day,
        demam: Math.floor(Math.random() * 3),
        batuk: Math.floor(Math.random() * 4),
        sakitPerut: Math.floor(Math.random() * 2),
        pusing: Math.floor(Math.random() * 2)
      }));
      
      setReportData({
        totalStudents,
        healthyCount,
        sickCount,
        absentCount,
        healthIssues,
        attendanceRate,
        chartData,
        healthTrend
      });
    } catch (error) {
      console.error('Error fetching report data:', error);
      toast.error('Gagal memuat data laporan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    toast.success('Laporan berhasil diunduh');
  };

  const handlePrint = () => {
    toast.success('Laporan dikirim ke printer');
  };

  // Chart colors
  const COLORS = ['#10b981', '#f59e0b', '#ef4444', '#3b82f6'];

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="guru" links={guruLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Laporan Kesehatan</h1>
            <p className="text-gray-600">Laporan kesehatan siswa kelas {selectedClass}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-[100px]">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6A">Kelas 6A</SelectItem>
                <SelectItem value="6B">Kelas 6B</SelectItem>
                <SelectItem value="5A">Kelas 5A</SelectItem>
                <SelectItem value="5B">Kelas 5B</SelectItem>
              </SelectContent>
            </Select>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {timeframe === 'minggu' && 'Minggu Ini'}
                  {timeframe === 'bulan' && 'Bulan Ini'}
                  {timeframe === 'semester' && 'Semester Ini'}
                  <ChevronDown size={14} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTimeframe('minggu')}>
                  Minggu Ini
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe('bulan')}>
                  Bulan Ini
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimeframe('semester')}>
                  Semester Ini
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" onClick={handleExport} className="flex items-center gap-2">
              <Download size={16} />
              <span>Unduh</span>
            </Button>

            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer size={16} />
              <span>Cetak</span>
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-2 w-[400px]">
            <TabsTrigger value="overview">Ikhtisar</TabsTrigger>
            <TabsTrigger value="detailed">Detail Laporan</TabsTrigger>
          </TabsList>
        </Tabs>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Siswa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.totalStudents}</div>
                <p className="text-xs text-gray-500">Kelas {selectedClass}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Kondisi Sehat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.healthyCount}</div>
                <p className="text-xs text-green-600">{Math.round((reportData.healthyCount / reportData.totalStudents) * 100)}% dari total siswa</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Perlu Perhatian</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.sickCount}</div>
                <p className="text-xs text-amber-600">{Math.round((reportData.sickCount / reportData.totalStudents) * 100)}% dari total siswa</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Tidak Hadir</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{reportData.absentCount}</div>
                <p className="text-xs text-red-600">{Math.round((reportData.absentCount / reportData.totalStudents) * 100)}% dari total siswa</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Tren Kehadiran & Kesehatan</CardTitle>
                <CardDescription>
                  Grafik tren kehadiran dan kondisi kesehatan siswa
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <p>Memuat data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={reportData.chartData}
                      margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="sehat" name="Sehat" stackId="a" fill="#10b981" />
                      <Bar dataKey="sakit" name="Kurang Sehat" stackId="a" fill="#f59e0b" />
                      <Bar dataKey="absen" name="Tidak Hadir" stackId="a" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribusi Kondisi Kesehatan</CardTitle>
                <CardDescription>
                  Persentase kondisi kesehatan siswa
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <p>Memuat data...</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Sehat', value: reportData.healthyCount },
                          { name: 'Kurang Sehat', value: reportData.sickCount },
                          { name: 'Tidak Hadir', value: reportData.absentCount }
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Masalah Kesehatan Umum</CardTitle>
              <CardDescription>
                Jenis keluhan kesehatan yang sering dialami siswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-3 bg-gray-50 p-3 text-sm font-medium border-b border-gray-200">
                  <div>Masalah Kesehatan</div>
                  <div className="text-center">Jumlah Siswa</div>
                  <div className="text-right">Persentase</div>
                </div>
                <div className="divide-y divide-gray-200">
                  {reportData.healthIssues.map((issue, index) => (
                    <div key={index} className="grid grid-cols-3 p-3">
                      <div>{issue.name}</div>
                      <div className="text-center">{issue.count}</div>
                      <div className="text-right">{issue.percentage}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-0">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tren Masalah Kesehatan</CardTitle>
              <CardDescription>
                Grafik tren jenis masalah kesehatan yang dialami siswa
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              {isLoading ? (
                <div className="h-full flex items-center justify-center">
                  <p>Memuat data...</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={reportData.healthTrend}
                    margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="demam" name="Demam" stroke="#ef4444" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="batuk" name="Batuk & Pilek" stroke="#3b82f6" />
                    <Line type="monotone" dataKey="sakitPerut" name="Sakit Perut" stroke="#f59e0b" />
                    <Line type="monotone" dataKey="pusing" name="Pusing" stroke="#8b5cf6" />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Tingkat Kehadiran</CardTitle>
              <CardDescription>
                Persentase kehadiran siswa dalam {timeframe}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Tingkat Kehadiran: {reportData.attendanceRate.toFixed(1)}%</span>
                <span className="text-sm text-gray-500">Target: 95%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    reportData.attendanceRate >= 95 ? 'bg-green-500' : 
                    reportData.attendanceRate >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                  }`} 
                  style={{ width: `${reportData.attendanceRate}%` }}
                ></div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-green-50 border border-green-100">
                  <h3 className="font-medium text-green-800">Kehadiran Tinggi</h3>
                  <p className="text-2xl font-bold text-green-700">19</p>
                  <p className="text-xs text-green-600">76% siswa (≥90% kehadiran)</p>
                </div>
                
                <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-100">
                  <h3 className="font-medium text-yellow-800">Kehadiran Sedang</h3>
                  <p className="text-2xl font-bold text-yellow-700">4</p>
                  <p className="text-xs text-yellow-600">16% siswa (75-89% kehadiran)</p>
                </div>
                
                <div className="p-4 rounded-lg bg-red-50 border border-red-100">
                  <h3 className="font-medium text-red-800">Kehadiran Rendah</h3>
                  <p className="text-2xl font-bold text-red-700">2</p>
                  <p className="text-xs text-red-600">8% siswa (≤74% kehadiran)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rekomendasi</CardTitle>
              <CardDescription>
                Rekomendasi berdasarkan analisis data kesehatan siswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg border border-blue-100 bg-blue-50">
                  <h3 className="text-blue-800 font-medium mb-1">Pemantauan Kondisi Batuk dan Pilek</h3>
                  <p className="text-sm text-blue-700">
                    Terdapat peningkatan kasus batuk dan pilek dalam minggu ini. Disarankan untuk memberikan edukasi tentang
                    perlindungan diri dan menjaga kebersihan untuk mencegah penyebaran virus.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg border border-amber-100 bg-amber-50">
                  <h3 className="text-amber-800 font-medium mb-1">Perhatikan Siswa dengan Kehadiran Rendah</h3>
                  <p className="text-sm text-amber-700">
                    2 siswa memiliki tingkat kehadiran rendah, mungkin terkait dengan masalah kesehatan yang berkelanjutan.
                    Disarankan untuk menindaklanjuti dengan orang tua/wali siswa.
                  </p>
                </div>
                
                <div className="p-3 rounded-lg border border-green-100 bg-green-50">
                  <h3 className="text-green-800 font-medium mb-1">Program Gizi Seimbang</h3>
                  <p className="text-sm text-green-700">
                    Berdasarkan data IMT, beberapa siswa berada di luar rentang normal. Pertimbangkan untuk
                    mengadakan program edukasi tentang pentingnya gizi seimbang dan aktivitas fisik yang cukup.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
};

export default Laporan;
