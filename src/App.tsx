
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rute Dashboard Siswa */}
          <Route path="/dashboard/siswa" element={<DashboardSiswa />} />
          <Route path="/dashboard/siswa/:subpage" element={<DashboardSiswa />} />
          
          {/* Rute Dashboard Guru */}
          <Route path="/dashboard/guru" element={<DashboardGuru />} />
          <Route path="/dashboard/guru/:subpage" element={<DashboardGuru />} />
          
          {/* Rute Dashboard Admin */}
          <Route path="/dashboard/admin" element={<DashboardAdmin />} />
          <Route path="/dashboard/admin/:subpage" element={<DashboardAdmin />} />
          
          {/* Rute Catch-All untuk 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
