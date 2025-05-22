
import React, { useState, useEffect } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { adminLinks } from '@/constants/menuLinks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { Json } from '@/integrations/supabase/types';

interface SystemSettings {
  school_name: string;
  school_address: string;
  enable_notifications: boolean;
  maintenance_mode: boolean;
  data_retention_days: number;
}

// Helper function to convert Json to SystemSettings with type safety
const jsonToSystemSettings = (json: Json): SystemSettings => {
  const defaultSettings: SystemSettings = {
    school_name: 'SD PEDULIKECIL',
    school_address: 'Jl. Pendidikan No. 123, Jakarta',
    enable_notifications: true,
    maintenance_mode: false,
    data_retention_days: 365,
  };

  if (!json || typeof json !== 'object' || Array.isArray(json)) {
    return defaultSettings;
  }

  const jsonObj = json as Record<string, unknown>;
  
  return {
    school_name: typeof jsonObj.school_name === 'string' ? jsonObj.school_name : defaultSettings.school_name,
    school_address: typeof jsonObj.school_address === 'string' ? jsonObj.school_address : defaultSettings.school_address,
    enable_notifications: typeof jsonObj.enable_notifications === 'boolean' ? jsonObj.enable_notifications : defaultSettings.enable_notifications,
    maintenance_mode: typeof jsonObj.maintenance_mode === 'boolean' ? jsonObj.maintenance_mode : defaultSettings.maintenance_mode,
    data_retention_days: typeof jsonObj.data_retention_days === 'number' ? jsonObj.data_retention_days : defaultSettings.data_retention_days,
  };
};

const Pengaturan = () => {
  const [activeTab, setActiveTab] = useState('system');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const [settings, setSettings] = useState<SystemSettings>({
    school_name: 'SD PEDULIKECIL',
    school_address: 'Jl. Pendidikan No. 123, Jakarta',
    enable_notifications: true,
    maintenance_mode: false,
    data_retention_days: 365,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'system_settings')
        .single();
      
      if (error && error.code !== 'PGRST116') { // PGRST116 is "No rows returned" error
        throw error;
      }
      
      if (data && data.value) {
        // Use the helper function to safely convert Json to SystemSettings
        setSettings(jsonToSystemSettings(data.value));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Gagal memuat pengaturan sistem');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      
      const { data: existingSettings } = await supabase
        .from('settings')
        .select('*')
        .eq('key', 'system_settings')
        .single();
      
      if (existingSettings) {
        // Update existing settings
        const { error } = await supabase
          .from('settings')
          .update({ value: settings as unknown as Json })
          .eq('key', 'system_settings');
          
        if (error) throw error;
      } else {
        // Insert new settings
        const { error } = await supabase
          .from('settings')
          .insert({ 
            key: 'system_settings', 
            value: settings as unknown as Json 
          });
          
        if (error) throw error;
      }
      
      toast.success('Pengaturan berhasil disimpan');
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Gagal menyimpan pengaturan');
    } finally {
      setIsSaving(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    
    setSettings({
      ...settings,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleSwitchChange = (name: keyof SystemSettings, checked: boolean) => {
    setSettings({
      ...settings,
      [name]: checked,
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="admin" links={adminLinks} />
      
      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Pengaturan</h1>
          <p className="text-gray-600">Konfigurasi sistem PEDULIKECIL</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="system">Sistem</TabsTrigger>
            <TabsTrigger value="users">Pengguna</TabsTrigger>
            <TabsTrigger value="backup">Backup & Pemulihan</TabsTrigger>
          </TabsList>
          
          <TabsContent value="system">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Sistem</CardTitle>
                <CardDescription>Konfigurasi dasar aplikasi PEDULIKECIL</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8">
                    <p>Memuat pengaturan...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Informasi Sekolah</h3>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="school_name" className="md:text-right">
                            Nama Sekolah
                          </Label>
                          <Input
                            id="school_name"
                            name="school_name"
                            value={settings.school_name}
                            onChange={handleInputChange}
                            className="md:col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                          <Label htmlFor="school_address" className="md:text-right">
                            Alamat Sekolah
                          </Label>
                          <Input
                            id="school_address"
                            name="school_address"
                            value={settings.school_address}
                            onChange={handleInputChange}
                            className="md:col-span-3"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notifikasi</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="enable_notifications">
                              Aktifkan Notifikasi
                            </Label>
                            <p className="text-sm text-gray-500">
                              Notifikasi untuk guru dan orang tua tentang kesehatan siswa.
                            </p>
                          </div>
                          <Switch
                            id="enable_notifications"
                            checked={settings.enable_notifications}
                            onCheckedChange={(checked) => handleSwitchChange('enable_notifications', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Mode Pemeliharaan</h3>
                      <div className="grid gap-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="maintenance_mode">
                              Aktifkan Mode Pemeliharaan
                            </Label>
                            <p className="text-sm text-gray-500">
                              Nonaktifkan akses ke aplikasi untuk semua pengguna kecuali admin.
                            </p>
                          </div>
                          <Switch
                            id="maintenance_mode"
                            checked={settings.maintenance_mode}
                            onCheckedChange={(checked) => handleSwitchChange('maintenance_mode', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Retensi Data</h3>
                      <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-4">
                        <Label htmlFor="data_retention_days" className="md:text-right">
                          Periode Retensi (hari)
                        </Label>
                        <Input
                          id="data_retention_days"
                          name="data_retention_days"
                          type="number"
                          value={settings.data_retention_days}
                          onChange={handleInputChange}
                          className="md:col-span-3"
                          min="30"
                          max="3650"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <Button 
                        onClick={handleSaveSettings}
                        disabled={isSaving}
                        className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90"
                      >
                        {isSaving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Pengaturan Pengguna</CardTitle>
                <CardDescription>Kelola pengaturan pengguna sistem</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">Fitur pengaturan pengguna sedang dalam pengembangan.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="backup">
            <Card>
              <CardHeader>
                <CardTitle>Backup & Pemulihan</CardTitle>
                <CardDescription>Kelola backup dan pemulihan data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500">Fitur backup dan pemulihan sedang dalam pengembangan.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Pengaturan;
