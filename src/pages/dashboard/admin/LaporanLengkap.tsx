
import React from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { adminLinks } from '@/constants/menuLinks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const LaporanLengkap = () => {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="admin" links={adminLinks} />
      
      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Laporan Lengkap</h1>
          <p className="text-gray-600">Laporan komprehensif kesehatan siswa</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Laporan</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Konten laporan kesehatan akan ditampilkan disini.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LaporanLengkap;
