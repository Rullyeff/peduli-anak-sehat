import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import DashboardSiswa from "./pages/dashboard/DashboardSiswa";
import DashboardGuru from "./pages/dashboard/DashboardGuru";
import DashboardAdmin from "./pages/dashboard/DashboardAdmin";
import NotFound from "./pages/NotFound";
import Artikel from "./pages/Artikel";

// Siswa pages
import DataKesehatan from "./pages/dashboard/siswa/DataKesehatan";
import Keluhan from "./pages/dashboard/siswa/Keluhan";
import Riwayat from "./pages/dashboard/siswa/Riwayat";
import Statistik from "./pages/dashboard/siswa/Statistik";

// Guru pages
import DaftarSiswa from "./pages/dashboard/guru/DaftarSiswa";
import GuruKeluhan from "./pages/dashboard/guru/Keluhan";
import Laporan from "./pages/dashboard/guru/Laporan";
import Pemberitahuan from "./pages/dashboard/guru/Pemberitahuan";
import KelolaVideo from "./pages/dashboard/guru/KelolaVideo";

// Admin pages
import KelolaSiswa from "./pages/dashboard/admin/KelolaSiswa";
import KelolaGuru from "./pages/dashboard/admin/KelolaGuru";
import LaporanLengkap from "./pages/dashboard/admin/LaporanLengkap";
import Pengaturan from "./pages/dashboard/admin/Pengaturan";
import KelolaFitur from "./pages/dashboard/admin/KelolaFitur";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/artikel" element={<Artikel />} />
          
          {/* Rute Dashboard Siswa */}
          <Route path="/dashboard/siswa" element={<DashboardSiswa />} />
          <Route path="/dashboard/siswa/data-kesehatan" element={<DataKesehatan />} />
          <Route path="/dashboard/siswa/keluhan" element={<Keluhan />} />
          <Route path="/dashboard/siswa/riwayat" element={<Riwayat />} />
          <Route path="/dashboard/siswa/statistik" element={<Statistik />} />
          
          {/* Rute Dashboard Guru */}
          <Route path="/dashboard/guru" element={<DashboardGuru />} />
          <Route path="/dashboard/guru/siswa" element={<DaftarSiswa />} />
          <Route path="/dashboard/guru/keluhan" element={<GuruKeluhan />} />
          <Route path="/dashboard/guru/laporan" element={<Laporan />} />
          <Route path="/dashboard/guru/pemberitahuan" element={<Pemberitahuan />} />
          <Route path="/dashboard/guru/video" element={<KelolaVideo />} />
          
          {/* Rute Dashboard Admin */}
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/dashboard/admin/siswa" element={<KelolaSiswa />} />
          <Route path="/dashboard/admin/guru" element={<KelolaGuru />} />
          <Route path="/dashboard/admin/laporan" element={<LaporanLengkap />} />
          <Route path="/dashboard/admin/pengaturan" element={<Pengaturan />} />
          <Route path="/dashboard/admin/fitur" element={<KelolaFitur />} />
          
          {/* Rute Catch-All untuk 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
