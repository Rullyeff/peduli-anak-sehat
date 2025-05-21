
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { MessageCircle, Send } from 'lucide-react';
import { siswaLinks } from '@/constants/menuLinks';
import { Badge } from '@/components/ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { supabase } from '@/integrations/supabase/client';
import { Complaint } from '@/types';

// Interface for database keluhan data
interface KeluhanData {
  id: string;
  siswa_id: string;
  isi_keluhan: string;
  created_at: string;
  updated_at: string;
  status: string;
  tanggapan: string | null;
  guru_id: string | null;
}

const Keluhan = () => {
  const [keluhanText, setKeluhanText] = useState('');
  const [keluhanList, setKeluhanList] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = '1'; // This would come from authentication context

  const fetchKeluhan = async () => {
    setIsLoading(true);
    try {
      const { data: keluhanData, error } = await supabase
        .from('keluhan')
        .select(`
          *,
          siswa:siswa_id (
            id, nama, kelas
          )
        `)
        .eq('siswa_id', userId);

      if (error) throw error;

      if (keluhanData) {
        // Transform the data to match the Complaint interface
        const formattedKeluhan: Complaint[] = keluhanData.map((item: KeluhanData) => ({
          id: item.id,
          siswa_id: item.siswa_id,
          siswa_name: "User's Name", // This would normally come from the join but we're hardcoding for now
          created_at: item.created_at,
          status: item.status,
          isi_keluhan: item.isi_keluhan,
          response: item.tanggapan || undefined,
          response_date: item.updated_at
        }));

        setKeluhanList(formattedKeluhan);
      }
    } catch (error) {
      console.error('Error fetching keluhan:', error);
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
      const { data, error } = await supabase
        .from('keluhan')
        .insert({
          siswa_id: userId,
          isi_keluhan: keluhanText,
          status: 'menunggu'
        })
        .select();

      if (error) throw error;

      toast.success('Keluhan berhasil dikirim');
      setKeluhanText('');
      fetchKeluhan(); // Refresh the list
    } catch (error) {
      console.error('Error submitting keluhan:', error);
      toast.error('Gagal mengirim keluhan');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    fetchKeluhan();
  }, []);

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="siswa" links={siswaLinks} />

      <div className="flex-1 p-6 pt-6 lg:p-8 ml-0 md:ml-64">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Keluhan Kesehatan</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Riwayat Keluhan</CardTitle>
                <CardDescription>
                  Daftar keluhan yang telah Anda kirimkan
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Memuat data...</p>
                  </div>
                ) : keluhanList.length > 0 ? (
                  <div className="space-y-4">
                    {keluhanList.map((keluhan) => (
                      <div key={keluhan.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{formatDistanceToNow(new Date(keluhan.created_at), { addSuffix: true, locale: id })}</p>
                          </div>
                          <Badge className={
                            keluhan.status === 'selesai' 
                              ? 'bg-green-100 text-green-800 hover:bg-green-100'
                              : keluhan.status === 'diproses' 
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-100'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                          }>
                            {keluhan.status === 'selesai' 
                              ? 'Selesai' 
                              : keluhan.status === 'diproses' 
                                ? 'Diproses'
                                : 'Menunggu'}
                          </Badge>
                        </div>
                        
                        <div className="bg-gray-50 p-3 rounded-md mb-4">
                          <p className="text-gray-700">{keluhan.isi_keluhan}</p>
                        </div>

                        {keluhan.response && (
                          <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
                            <p className="text-sm font-medium text-blue-700 mb-1">Tanggapan Guru:</p>
                            <p className="text-gray-700">{keluhan.response}</p>
                            {keluhan.response_date && (
                              <p className="text-xs text-gray-500 mt-2">
                                {formatDistanceToNow(new Date(keluhan.response_date), { addSuffix: true, locale: id })}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Belum ada keluhan yang diajukan</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Kirim Keluhan</CardTitle>
              <CardDescription>
                Sampaikan keluhan kesehatan Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitKeluhan}>
                <div className="mb-4">
                  <Textarea
                    placeholder="Tuliskan keluhan kesehatan Anda di sini..."
                    value={keluhanText}
                    onChange={(e) => setKeluhanText(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-kesehatan-biru hover:bg-kesehatan-biru/90"
                  disabled={isSubmitting}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Kirim Keluhan
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Keluhan;
