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
  Send
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { guruLinks } from '@/constants/menuLinks';
import { supabase } from '@/integrations/supabase/client';
import { Complaint } from '@/types';

const KeluhanGuru = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedClass, setSelectedClass] = useState('6A');
  const [selectedComplaint, setSelectedComplaint] = useState<string | null>(null);
  const [responseText, setResponseText] = useState('');
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchComplaints();
  }, [selectedClass, activeTab]);

  const fetchComplaints = async () => {
    try {
      setIsLoading(true);
      
      let query = supabase
        .from('keluhan')
        .select(`
          *,
          siswa!inner(id, nama, kelas)
        `)
        .eq('siswa.kelas', selectedClass);
      
      if (activeTab === 'pending') {
        query = query.eq('status', 'menunggu');
      } else if (activeTab === 'responded') {
        query = query.eq('status', 'ditanggapi');
      }
      
      query = query.order('created_at', { ascending: false });
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      if (data) {
        const processedComplaints: Complaint[] = data.map(item => {
          return {
            id: item.id,
            siswa_id: item.siswa_id,
            siswa_name: item.siswa.nama,
            isi_keluhan: item.isi_keluhan,
            created_at: item.created_at,
            status: item.status,
            response: item.tanggapan || undefined,
            response_date: item.updated_at
          };
        });
        
        setComplaints(processedComplaints);
      } else {
        setComplaints([]);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Gagal memuat data keluhan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitResponse = async () => {
    if (!responseText.trim()) {
      toast.error('Respons tidak boleh kosong');
      return;
    }

    if (selectedComplaint !== null) {
      setIsSubmitting(true);
      
      try {
        // Update the keluhan with the response
        const { error: updateError } = await supabase
          .from('keluhan')
          .update({ 
            tanggapan: responseText,
            status: 'ditanggapi'
          })
          .eq('id', selectedComplaint);
        
        if (updateError) throw updateError;
        
        toast.success('Respons berhasil dikirim');
        setResponseText('');
        setSelectedComplaint(null);
        
        // Refresh complaints list
        fetchComplaints();
      } catch (error) {
        console.error('Error submitting response:', error);
        toast.error('Gagal mengirim respons');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const filteredComplaints = complaints.filter(complaint =>
    complaint.siswa_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    complaint.isi_keluhan.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="guru" links={guruLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tanggapan Keluhan</h1>
            <p className="text-gray-600">Tanggapi keluhan kesehatan siswa kelas {selectedClass}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Cari keluhan..."
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <CardTitle>Daftar Keluhan</CardTitle>
              <CardDescription>
                Keluhan kesehatan dari siswa kelas {selectedClass}
              </CardDescription>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="all">Semua</TabsTrigger>
                  <TabsTrigger value="pending">Belum Ditanggapi</TabsTrigger>
                  <TabsTrigger value="responded">Sudah Ditanggapi</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8">
                  <p>Memuat data keluhan...</p>
                </div>
              ) : filteredComplaints.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Tidak ada keluhan yang ditemukan</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredComplaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className={`p-4 rounded-lg border ${
                        selectedComplaint === complaint.id ? 'border-kesehatan-hijau bg-kesehatan-hijau/5' : 'border-gray-200'
                      } hover:border-gray-300 cursor-pointer transition-colors duration-200`}
                      onClick={() => setSelectedComplaint(complaint.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                            <span className="font-semibold">{complaint.siswa_name.charAt(0)}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{complaint.siswa_name}</h4>
                            <p className="text-xs text-gray-500">{formatDate(complaint.created_at)}</p>
                          </div>
                        </div>
                        
                        <Badge className={`${
                          complaint.status === 'menunggu' ? 
                          'bg-amber-100 text-amber-800 hover:bg-amber-100' : 
                          'bg-green-100 text-green-800 hover:bg-green-100'
                        }`}>
                          {complaint.status === 'menunggu' ? 'Belum Ditanggapi' : 'Sudah Ditanggapi'}
                        </Badge>
                      </div>
                      
                      <div className="ml-12">
                        <p className="text-sm text-gray-700">{complaint.isi_keluhan}</p>
                        
                        {complaint.status === 'ditanggapi' && complaint.response && (
                          <div className="mt-3 p-2 bg-green-50 rounded-md border border-green-100">
                            <p className="text-xs font-medium text-green-800 mb-1">Tanggapan Anda:</p>
                            <p className="text-sm text-green-700">{complaint.response}</p>
                            {complaint.response_date && (
                              <p className="text-xs text-green-600 mt-1">
                                {formatDate(complaint.response_date)}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Tanggapan Keluhan</CardTitle>
              <CardDescription>
                Berikan tanggapan untuk keluhan siswa
              </CardDescription>
            </CardHeader>
            <CardContent>
              {selectedComplaint !== null ? (
                <>
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-1">Merespon keluhan dari:</p>
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <p className="font-semibold">
                        {filteredComplaints.find(c => c.id === selectedComplaint)?.siswa_name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {filteredComplaints.find(c => c.id === selectedComplaint)?.isi_keluhan}
                      </p>
                    </div>
                  </div>

                  {filteredComplaints.find(c => c.id === selectedComplaint)?.status === 'ditanggapi' ? (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Anda sudah memberikan tanggapan:</p>
                      <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                        <p className="text-sm text-green-700">
                          {filteredComplaints.find(c => c.id === selectedComplaint)?.response}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
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
                        <Button variant="outline" onClick={() => setSelectedComplaint(null)}>
                          Batal
                        </Button>
                        <Button 
                          className="bg-kesehatan-hijau hover:bg-kesehatan-hijau/90 flex gap-2"
                          onClick={handleSubmitResponse}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? 'Mengirim...' : (
                            <>
                              <Send size={16} />
                              <span>Kirim Respons</span>
                            </>
                          )}
                        </Button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Pilih keluhan siswa untuk memberikan tanggapan</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default KeluhanGuru;
