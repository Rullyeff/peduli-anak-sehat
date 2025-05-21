
import React, { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Home, 
  Users, 
  MessageSquare, 
  FileText, 
  Bell,
  Search,
  Filter,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { guruLinks } from '@/constants/menuLinks';
import { supabase } from '@/integrations/supabase/client';

interface Student {
  id: number;
  nama: string;
  kelas: string;
  health_status: string;
  last_update: string;
  complaint: string | null;
}

const DaftarSiswa = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('semua');
  const [selectedClass, setSelectedClass] = useState('6A');
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, [selectedClass]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      
      // In a real app, this would be filtered by the teacher's assigned class
      const { data, error } = await supabase
        .from('siswa')
        .select(`
          *,
          health_records (*)
        `)
        .eq('kelas', selectedClass)
        .order('nama');
      
      if (error) throw error;
      
      if (data) {
        // Process data to add health status based on latest health record
        const processedStudents = data.map(student => {
          const healthRecords = student.health_records || [];
          const latestRecord = healthRecords.length > 0 ? 
            healthRecords.reduce((latest, current) => 
              new Date(current.created_at) > new Date(latest.created_at) ? current : latest
            ) : null;
          
          return {
            id: student.id,
            nama: student.nama,
            kelas: student.kelas,
            health_status: latestRecord?.kondisi || 'unknown',
            complaint: latestRecord?.keluhan || null,
            last_update: latestRecord?.created_at ? new Date(latestRecord.created_at).toLocaleDateString('id-ID') : 'Belum ada data'
          };
        });
        
        setStudents(processedStudents);
      } else {
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Gagal memuat data siswa');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.nama.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'semua' || 
                      (activeTab === 'sakit' && student.health_status === 'sakit') || 
                      (activeTab === 'sehat' && student.health_status === 'sehat');
    return matchesSearch && matchesTab;
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="guru" links={guruLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daftar Siswa</h1>
            <p className="text-gray-600">Daftar dan status kesehatan siswa kelas {selectedClass}</p>
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
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daftar Siswa</CardTitle>
                <CardDescription>
                  Pantau kesehatan siswa kelas {selectedClass}
                </CardDescription>
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">{new Date().toLocaleDateString('id-ID')}</span>
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

            {isLoading ? (
              <div className="text-center py-8">
                <p>Memuat data siswa...</p>
              </div>
            ) : filteredStudents.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada siswa yang ditemukan</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 cursor-pointer transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${
                          student.health_status === 'sehat' ? 
                          'bg-green-100 text-green-700' : 
                          student.health_status === 'sakit' ?
                          'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          <span className="font-semibold">{student.nama.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-medium">{student.nama}</h4>
                          <p className="text-sm text-gray-500">Update: {student.last_update}</p>
                        </div>
                      </div>
                      
                      <Badge className={`${
                        student.health_status === 'sehat' ? 
                        'bg-green-100 text-green-800 hover:bg-green-100' : 
                        student.health_status === 'sakit' ?
                        'bg-red-100 text-red-800 hover:bg-red-100' :
                        'bg-gray-100 text-gray-800 hover:bg-gray-100'
                      }`}>
                        {student.health_status === 'sehat' ? 'Sehat' : 
                         student.health_status === 'sakit' ? 'Perlu Perhatian' : 
                         'Belum Ada Data'}
                      </Badge>
                    </div>
                    
                    {student.health_status === 'sakit' && student.complaint && (
                      <div className="mt-2 pl-12">
                        <p className="text-sm text-gray-600">
                          <span className="font-semibold">Keluhan:</span> {student.complaint}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DaftarSiswa;
