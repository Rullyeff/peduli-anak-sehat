import React, { useState } from 'react';
import SidebarDashboard from '@/components/dashboard/SidebarDashboard';
import { 
  Home, 
  Users, 
  UserPlus, 
  FileText, 
  Settings,
  Search,
  ChevronDown,
  Edit,
  Trash2,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { adminLinks } from '@/constants/menuLinks';

// Data dummy pengguna
const dummyUsers = [
  { id: 1, name: 'Budi Santoso', role: 'siswa', class: '6A', username: 'budi', status: 'aktif' },
  { id: 2, name: 'Ani Wijaya', role: 'siswa', class: '6A', username: 'ani', status: 'aktif' },
  { id: 3, name: 'Ibu Heni', role: 'guru', class: '6A', username: 'heni', status: 'aktif' },
  { id: 4, name: 'Bapak Dedi', role: 'guru', class: '6B', username: 'dedi', status: 'aktif' },
  { id: 5, name: 'Deni Hermawan', role: 'siswa', class: '6B', username: 'deni', status: 'nonaktif' },
];

// Data dummy untuk statistik
const statisticsSummary = {
  totalStudents: 150,
  totalTeachers: 12,
  activeAccounts: 162,
  inactiveAccounts: 5,
  healthReports: 782,
  totalClasses: 6,
};

const DashboardAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('semua');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  // Form state untuk menambah/edit akun
  const [formData, setFormData] = useState({
    name: '',
    role: 'siswa',
    username: '',
    password: '',
    class: '',
    status: 'aktif'
  });

  // Filter data pengguna berdasarkan peran dan pencarian
  const filteredUsers = dummyUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'semua' || user.role === activeTab;
    return matchesSearch && matchesTab;
  });

  // Handler untuk mengedit pengguna
  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      role: user.role,
      username: user.username,
      password: '',
      class: user.class,
      status: user.status
    });
    setDialogOpen(true);
  };

  // Handler untuk menghapus pengguna
  const handleDeleteUser = (user: any) => {
    // Demo saja - tidak benar-benar menghapus
    toast.success(`Akun ${user.name} berhasil dihapus`);
  };

  // Handler untuk menambah atau memperbarui akun
  const handleSubmitForm = () => {
    // Validasi form
    if (!formData.name || !formData.username || (!editingUser && !formData.password) || !formData.class) {
      toast.error('Semua field wajib diisi');
      return;
    }

    if (editingUser) {
      toast.success(`Akun ${formData.name} berhasil diperbarui`);
    } else {
      toast.success(`Akun baru untuk ${formData.name} berhasil dibuat`);
    }

    setDialogOpen(false);
    setEditingUser(null);
    setFormData({
      name: '',
      role: 'siswa',
      username: '',
      password: '',
      class: '',
      status: 'aktif'
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <SidebarDashboard role="admin" links={adminLinks} />

      <div className="flex-1 p-4 pt-6 sm:p-6 lg:p-8 ml-0 md:ml-64">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
            <p className="text-gray-600">Selamat datang, Admin PEDULIKECIL</p>
          </div>

          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <Input 
                placeholder="Cari pengguna..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90 flex gap-2">
                  <UserPlus size={16} />
                  <span>Tambah Akun</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>{editingUser ? 'Edit Akun' : 'Tambah Akun Baru'}</DialogTitle>
                  <DialogDescription>
                    {editingUser ? 'Perbarui data akun pengguna' : 'Isi formulir untuk membuat akun baru'}
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nama Lengkap
                    </Label>
                    <Input
                      id="name"
                      placeholder="Masukkan nama lengkap"
                      className="col-span-3"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Peran
                    </Label>
                    <Select 
                      value={formData.role} 
                      onValueChange={(value) => setFormData({...formData, role: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih peran" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="siswa">Siswa</SelectItem>
                        <SelectItem value="guru">Guru</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="class" className="text-right">
                      Kelas
                    </Label>
                    <Select 
                      value={formData.class} 
                      onValueChange={(value) => setFormData({...formData, class: value})}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Pilih kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6A">6A</SelectItem>
                        <SelectItem value="6B">6B</SelectItem>
                        <SelectItem value="5A">5A</SelectItem>
                        <SelectItem value="5B">5B</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Username
                    </Label>
                    <Input
                      id="username"
                      placeholder="Masukkan username"
                      className="col-span-3"
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="password" className="text-right">
                      Kata Sandi
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder={editingUser ? "Kosongkan jika tidak ingin mengubah" : "Masukkan kata sandi"}
                      className="col-span-3"
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                    />
                  </div>
                  {editingUser && (
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label className="text-right">Status</Label>
                      <RadioGroup 
                        className="flex col-span-3 space-x-4"
                        value={formData.status}
                        onValueChange={(value) => setFormData({...formData, status: value})}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="aktif" id="aktif" />
                          <Label htmlFor="aktif">Aktif</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="nonaktif" id="nonaktif" />
                          <Label htmlFor="nonaktif">Non-aktif</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Batal
                  </Button>
                  <Button 
                    onClick={handleSubmitForm}
                    className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90"
                  >
                    {editingUser ? 'Perbarui' : 'Simpan'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Akun</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{statisticsSummary.activeAccounts + statisticsSummary.inactiveAccounts}</p>
                <span className="text-sm text-green-600 font-medium">
                  +5 bulan ini
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {statisticsSummary.activeAccounts} aktif, {statisticsSummary.inactiveAccounts} nonaktif
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Akun Siswa</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{statisticsSummary.totalStudents}</p>
                <span className="text-sm text-green-600 font-medium">
                  +3 bulan ini
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Dari total {statisticsSummary.totalClasses} kelas
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Akun Guru</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-bold">{statisticsSummary.totalTeachers}</p>
                <span className="text-sm text-green-600 font-medium">
                  +1 bulan ini
                </span>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Dari total {statisticsSummary.totalClasses} kelas
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Kelola Akun Pengguna</CardTitle>
            <CardDescription>
              Lihat, tambah, edit, dan hapus akun pengguna
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="semua">Semua Pengguna</TabsTrigger>
                <TabsTrigger value="siswa">Siswa</TabsTrigger>
                <TabsTrigger value="guru">Guru</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">No</TableHead>
                    <TableHead>Nama Lengkap</TableHead>
                    <TableHead>Username</TableHead>
                    <TableHead>Peran</TableHead>
                    <TableHead>Kelas</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Aksi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <TableRow key={user.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            user.role === 'siswa' ? 'bg-blue-100 text-blue-800' :
                            user.role === 'guru' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {user.role === 'siswa' ? 'Siswa' : 
                             user.role === 'guru' ? 'Guru' : 'Admin'}
                          </span>
                        </TableCell>
                        <TableCell>{user.class}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            user.status === 'aktif' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status === 'aktif' ? 'Aktif' : 'Non-aktif'}
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleEditUser(user)}
                            >
                              <Edit size={14} />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-8 w-8 p-0 border-red-200 text-red-700 hover:bg-red-50"
                              onClick={() => handleDeleteUser(user)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                        Tidak ada pengguna yang ditemukan
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ringkasan Laporan Kesehatan</CardTitle>
            <CardDescription>
              Statistik kesehatan dari seluruh siswa
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h4 className="text-sm font-medium text-blue-700">Total Laporan</h4>
                <p className="text-2xl font-bold text-blue-800">{statisticsSummary.healthReports}</p>
                <p className="text-xs text-blue-600">Sepanjang tahun ajaran</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <h4 className="text-sm font-medium text-green-700">Kondisi Sehat</h4>
                <p className="text-2xl font-bold text-green-800">640</p>
                <p className="text-xs text-green-600">81.8% dari total laporan</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="text-sm font-medium text-amber-700">Perlu Perhatian</h4>
                <p className="text-2xl font-bold text-amber-800">142</p>
                <p className="text-xs text-amber-600">18.2% dari total laporan</p>
              </div>
              <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                <h4 className="text-sm font-medium text-red-700">Tanggapan Guru</h4>
                <p className="text-2xl font-bold text-red-800">134</p>
                <p className="text-xs text-red-600">94.4% dari kasus perlu perhatian</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-6 flex justify-between">
            <p className="text-sm text-gray-500">Data diperbarui: 10 Mei 2023, 08:30</p>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText size={16} />
              <span>Unduh Laporan Lengkap</span>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAdmin;
