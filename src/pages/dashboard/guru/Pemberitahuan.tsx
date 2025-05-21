import React, { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Home, 
  Users, 
  MessageSquare, 
  FileText, 
  Bell,
  Filter,
  CheckCircle,
  AlertCircle,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { guruLinks } from '@/constants/menuLinks';
import { supabase } from '@/integrations/supabase/client';

interface Notification {
  id: number;
  title: string;
  message: string;
  type: 'keluhan' | 'kesehatan' | 'sistem';
  status: 'unread' | 'read';
  created_at: string;
  student_name?: string;
}

const Pemberitahuan = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedClass, setSelectedClass] = useState('6A');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data for notifications
  const dummyNotifications = [
    {
      id: 1,
      title: 'Keluhan Baru',
      message: 'Budi Santoso mengirimkan keluhan kesehatan baru.',
      type: 'keluhan',
      status: 'unread',
      created_at: new Date(2023, 4, 10, 8, 30).toISOString(),
      student_name: 'Budi Santoso'
    },
    {
      id: 2,
      title: 'Data Kesehatan Tidak Normal',
      message: 'Ani Wijaya melaporkan suhu tubuh 38.5°C.',
      type: 'kesehatan',
      status: 'unread',
      created_at: new Date(2023, 4, 10, 7, 45).toISOString(),
      student_name: 'Ani Wijaya'
    },
    {
      id: 3,
      title: 'Absensi',
      message: 'Deni Hermawan tidak hadir selama 2 hari berturut-turut.',
      type: 'sistem',
      status: 'read',
      created_at: new Date(2023, 4, 9, 14, 15).toISOString(),
      student_name: 'Deni Hermawan'
    },
    {
      id: 4,
      title: 'Keluhan Ditanggapi',
      message: 'Anda telah menanggapi keluhan dari Siti Nuraini.',
      type: 'keluhan',
      status: 'read',
      created_at: new Date(2023, 4, 9, 11, 0).toISOString(),
      student_name: 'Siti Nuraini'
    },
    {
      id: 5,
      title: 'Data Kesehatan Tidak Normal',
      message: 'Rudi Hartono melaporkan demam tinggi.',
      type: 'kesehatan',
      status: 'unread',
      created_at: new Date(2023, 4, 8, 16, 20).toISOString(),
      student_name: 'Rudi Hartono'
    },
  ];

  useEffect(() => {
    // In a real app, fetch notifications from database
    // For demo, we use the dummy data
    setTimeout(() => {
      setNotifications(dummyNotifications as Notification[]);
      setIsLoading(false);
    }, 500);
  }, [selectedClass]);

  const handleMarkAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, status: 'read' } : n
    ));
    toast.success('Notifikasi ditandai sebagai telah dibaca');
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, status: 'read' })));
    toast.success('Semua notifikasi ditandai sebagai telah dibaca');
  };

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return notification.status === 'unread';
    if (activeTab === 'keluhan') return notification.type === 'keluhan';
    if (activeTab === 'kesehatan') return notification.type === 'kesehatan';
    if (activeTab === 'sistem') return notification.type === 'sistem';
    return true;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    
    // Check if the date is today
    if (date.toDateString() === now.toDateString()) {
      return `Hari ini, ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Check if the date is yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return `Kemarin, ${date.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`;
    }
    
    // Otherwise, return the full date
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'keluhan':
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'kesehatan':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'sistem':
        return <Bell className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'keluhan':
        return <Badge variant="outline" className="border-blue-200 text-blue-700 bg-blue-50">Keluhan</Badge>;
      case 'kesehatan':
        return <Badge variant="outline" className="border-red-200 text-red-700 bg-red-50">Kesehatan</Badge>;
      case 'sistem':
        return <Badge variant="outline" className="border-purple-200 text-purple-700 bg-purple-50">Sistem</Badge>;
      default:
        return <Badge variant="outline">Lainnya</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="guru" links={guruLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pemberitahuan</h1>
            <p className="text-gray-600">Notifikasi dan pemberitahuan terkait siswa kelas {selectedClass}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
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
            
            <Button 
              variant="outline" 
              onClick={handleMarkAllAsRead}
              disabled={!notifications.some(n => n.status === 'unread')}
              className="flex items-center gap-2"
            >
              <CheckCircle size={16} />
              <span>Tandai Semua Dibaca</span>
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Daftar Notifikasi</CardTitle>
                <CardDescription>
                  Pemberitahuan terkait kesehatan dan aktivitas siswa
                </CardDescription>
              </div>
              <div className="flex items-center">
                <Calendar size={14} className="mr-2 text-gray-500" />
                <span className="text-sm text-gray-500">{new Date().toLocaleDateString('id-ID')}</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="all">Semua</TabsTrigger>
                <TabsTrigger value="unread">Belum Dibaca</TabsTrigger>
                <TabsTrigger value="keluhan">Keluhan</TabsTrigger>
                <TabsTrigger value="kesehatan">Kesehatan</TabsTrigger>
                <TabsTrigger value="sistem">Sistem</TabsTrigger>
              </TabsList>
            </Tabs>

            {isLoading ? (
              <div className="flex justify-center py-8">
                <p>Memuat notifikasi...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada notifikasi</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg border ${
                      notification.status === 'unread' ? 'border-kesehatan-hijau bg-kesehatan-hijau/5' : 'border-gray-200'
                    } transition-colors duration-200`}
                  >
                    <div className="flex justify-between">
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{notification.title}</h4>
                            {notification.status === 'unread' && (
                              <span className="inline-block w-2 h-2 bg-kesehatan-hijau rounded-full"></span>
                            )}
                            {getNotificationBadge(notification.type)}
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{formatDate(notification.created_at)}</p>
                        </div>
                      </div>
                      
                      {notification.status === 'unread' && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-gray-500 hover:text-kesehatan-hijau"
                        >
                          Tandai Dibaca
                        </Button>
                      )}
                    </div>
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

export default Pemberitahuan;
