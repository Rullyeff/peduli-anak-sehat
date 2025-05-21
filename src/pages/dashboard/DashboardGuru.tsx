import React, { useState } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Search,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { guruLinks } from '@/constants/menuLinks';

// Data dummy siswa
const dummyStudents = [
  { id: 1, name: 'Budi Santoso', health: 'sakit', complaint: 'Saya merasa pusing dan mual sejak pagi', lastUpdate: '10 mei 2023' },
  { id: 2, name: 'Ani Wijaya', health: 'sehat', complaint: '', lastUpdate: '10 mei 2023' },
  { id: 3, name: 'Deni Hermawan', health: 'sakit', complaint: 'Batuk dan pilek sudah 2 hari', lastUpdate: '9 mei 2023' },
  { id: 4, name: 'Siti Nuraini', health: 'sehat', complaint: '', lastUpdate: '10 mei 2023' },
  { id: 5, name: 'Rudi Hartono', health: 'sakit', complaint: 'Demam tinggi sejak semalam', lastUpdate: '9 mei 2023' },
];

const DashboardGuru = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<number | null>(null);
  const [responseText, setResponseText] = useState('');
  const [activeTab, setActiveTab] = useState('semua');

  const filteredStudents = dummyStudents.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'semua' || 
                      (activeTab === 'sakit' && student.health === 'sakit') || 
                      (activeTab === 'sehat' && student.health === 'sehat');
    return matchesSearch && matchesTab;
  });

  const handleSubmitResponse = () => {
    if (!responseText.trim()) {
      toast.error('Respons tidak boleh kosong');
      return;
    }

    if (selectedStudent !== null) {
      const student = dummyStudents.find(s => s.id === selectedStudent);
      toast.success(`Respons untuk ${student?.name} berhasil dikirim`);
      setResponseText('');
      setSelectedStudent(null);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="guru" links={guruLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Guru</h1>
            <p className="text-gray-600">Selamat datang, Ibu Heni (Wali Kelas 6A)</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Cari siswa..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select defaultValue="6A">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pilih Kelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6A">Kelas 6A</SelectItem>
                <SelectItem value="6B">Kelas 6B</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Daftar Siswa</CardTitle>
                  <CardDescription>
                    Pantau kesehatan siswa kelas 6A
                  </CardDescription>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2 text-gray-500" />
                  <span className="text-sm text-gray-500">10 Mei 2023</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="semua">Semua Siswa</TabsTrigger>
                  <TabsTrigger value="sehat">Sehat</TabsTrigger>
                  <TabsTrigger value="sakit">Perlu Perhatian</TabsTrigger>
                </TabsList>
              </Tabs>

              {filteredStudents.length > 0 ? (
                <div className="space-y-3">
                  {filteredStudents.map((student) => (
                    <div
                      key={student.id}
                      className={`p-4 rounded-lg border ${
                        selectedStudent === student.id ? 'border-kesehatan-hijau bg-kesehatan-hijau/5' : 'border-gray-200'
                      } cursor-pointer transition-colors duration-200`}
                      onClick={() => setSelectedStudent(student.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            student.health === 'sehat' ? 
                            'bg-green-100 text-green-700' : 
                            'bg-red-100 text-red-700'
                          }`}>
                            <span className="font-semibold">{student.name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-gray-500">Update: {student.lastUpdate}</p>
                          </div>
                        </div>
                        
                        <Badge className={`${
                          student.health === 'sehat' ? 
                          'bg-green-100 text-green-800 hover:bg-green-100' : 
                          'bg-red-100 text-red-800 hover:bg-red-100'
                        }`}>
                          {student.health === 'sehat' ? 'Sehat' : 'Perlu Perhatian'}
                        </Badge>
                      </div>
                      
                      {student.health === 'sakit' && (
                        <div className="mt-2 pl-12">
                          <p className="text-sm text-gray-600">
                            <span className="font-semibold">Keluhan:</span> {student.complaint}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Tidak ada siswa yang ditemukan</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Tanggapan Kesehatan</CardTitle>
              <CardDescription>
                Berikan tanggapan untuk keluhan siswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedStudent !== null ? (
                <>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Merespon keluhan dari:</p>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <p className="font-semibold">
                        {dummyStudents.find(s => s.id === selectedStudent)?.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {dummyStudents.find(s => s.id === selectedStudent)?.complaint || "Tidak ada keluhan (siswa sehat)"}
                      </p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Respon Anda:</p>
                    <Textarea
                      placeholder="Tuliskan tanggapan atau saran untuk siswa..."
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setSelectedStudent(null)}>
                      Batal
                    </Button>
                    <Button 
                      className="bg-kesehatan-hijau hover:bg-kesehatan-hijau/90"
                      onClick={handleSubmitResponse}
                    >
                      Kirim Respons
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Pilih siswa untuk memberikan tanggapan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Ringkasan Kesehatan Kelas 6A</CardTitle>
                  <CardDescription>
                    Status kesehatan siswa dalam 7 hari terakhir
                  </CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      Minggu Ini <ChevronDown size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Minggu Ini</DropdownMenuItem>
                    <DropdownMenuItem>Bulan Ini</DropdownMenuItem>
                    <DropdownMenuItem>Semester Ini</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-700">Total Siswa</h4>
                  <p className="text-2xl font-bold text-blue-800">25</p>
                  <p className="text-xs text-blue-600">Kelas 6A</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                  <h4 className="text-sm font-medium text-green-700">Kondisi Sehat</h4>
                  <p className="text-2xl font-bold text-green-800">20</p>
                  <p className="text-xs text-green-600">80% dari total siswa</p>
                </div>
                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <h4 className="text-sm font-medium text-amber-700">Perlu Perhatian</h4>
                  <p className="text-2xl font-bold text-amber-800">3</p>
                  <p className="text-xs text-amber-600">12% dari total siswa</p>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                  <h4 className="text-sm font-medium text-red-700">Tidak Hadir</h4>
                  <p className="text-2xl font-bold text-red-800">2</p>
                  <p className="text-xs text-red-600">8% dari total siswa</p>
                </div>
              </div>

              <div className="mt-6 rounded-lg border border-gray-200 overflow-hidden">
                <div className="grid grid-cols-3 bg-gray-50 p-3 text-sm font-medium border-b border-gray-200">
                  <div>Masalah Kesehatan</div>
                  <div className="text-center">Jumlah Siswa</div>
                  <div className="text-right">Persentase</div>
                </div>
                <div className="divide-y divide-gray-200">
                  <div className="grid grid-cols-3 p-3">
                    <div>Demam</div>
                    <div className="text-center">2</div>
                    <div className="text-right">8%</div>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <div>Batuk & Pilek</div>
                    <div className="text-center">3</div>
                    <div className="text-right">12%</div>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <div>Sakit Perut</div>
                    <div className="text-center">1</div>
                    <div className="text-right">4%</div>
                  </div>
                  <div className="grid grid-cols-3 p-3">
                    <div>Pusing</div>
                    <div className="text-center">1</div>
                    <div className="text-right">4%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardGuru;
