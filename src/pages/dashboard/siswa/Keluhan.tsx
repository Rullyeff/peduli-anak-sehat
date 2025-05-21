
import React, { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Home, 
  ClipboardList, 
  MessageSquare, 
  History, 
  Activity,
  Send
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { siswaLinks } from '@/constants/menuLinks';
import { supabase } from '@/integrations/supabase/client';

const Keluhan = () => {
  const [keluhanText, setKeluhanText] = useState('');
  const [keluhan, setKeluhan] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchKeluhan();
  }, []);

  const fetchKeluhan = async () => {
    try {
      setIsLoading(true);
      // In a real app, filter by current user's ID
      const siswaId = 1; // Example ID for demo purposes
      
      const { data, error } = await supabase
        .from('keluhan')
        .select(`
          *,
          responses (*)
        `)
        .eq('siswa_id', siswaId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setKeluhan(data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Gagal memuat data keluhan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitKeluhan = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!keluhanText.trim()) {
      toast.error('Keluhan tidak boleh kosong');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, use the authenticated user's ID
      const siswaId = 1; // Example ID for demo
      
      const { error } = await supabase
        .from('keluhan')
        .insert({
          siswa_id: siswaId,
          keluhan_text: keluhanText,
          status: 'menunggu'
        });
      
      if (error) throw error;
      
      toast.success('Keluhan berhasil dikirimkan');
      setKeluhanText('');
      fetchKeluhan(); // Refresh the list
    } catch (error) {
      console.error('Error submitting complaint:', error);
      toast.error('Gagal mengirimkan keluhan');
    } finally {
      setIsSubmitting(false);
    }
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'menunggu':
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Menunggu Tanggapan</Badge>;
      case 'ditanggapi':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Sudah Ditanggapi</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="siswa" links={siswaLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Keluhan Kesehatan</h1>
          <p className="text-gray-600">Sampaikan keluhan kesehatan Anda untuk mendapatkan tanggapan dari guru</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Form Keluhan Kesehatan</CardTitle>
              <CardDescription>
                Tuliskan keluhan kesehatan yang Anda rasakan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitKeluhan} className="space-y-4">
                <Textarea 
                  placeholder="Tuliskan keluhan kesehatan yang Anda rasakan di sini..."
                  className="min-h-[150px]"
                  value={keluhanText}
                  onChange={(e) => setKeluhanText(e.target.value)}
                />
                <Button 
                  type="submit"
                  className="w-full bg-kesehatan-biru hover:bg-kesehatan-biru/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Mengirimkan...' 
                  ) : (
                    <div className="flex items-center gap-2">
                      <Send size={16} /> 
                      Kirim Keluhan
                    </div>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Riwayat Keluhan dan Tanggapan</CardTitle>
              <CardDescription>
                Riwayat keluhan kesehatan Anda dan tanggapan dari guru
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <p>Memuat data...</p>
                </div>
              ) : keluhan.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>Belum ada keluhan yang dikirimkan</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {keluhan.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium">{item.keluhan_text}</p>
                          <p className="text-xs text-gray-500">{formatDate(item.created_at)}</p>
                        </div>
                        <div>
                          {getStatusBadge(item.status)}
                        </div>
                      </div>

                      {item.responses && item.responses.length > 0 && (
                        <>
                          <Separator className="my-3" />
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-sm font-medium text-gray-700 mb-1">Tanggapan dari Guru:</p>
                            <p className="text-sm">{item.responses[0].response_text}</p>
                            <p className="text-xs text-gray-500 mt-1">{formatDate(item.responses[0].created_at)}</p>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Keluhan;
