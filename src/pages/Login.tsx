
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { LogIn, User, Users, Settings } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('siswa');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Contoh validasi sederhana
    if (!username || !password) {
      toast.error('Nama pengguna dan kata sandi harus diisi!');
      return;
    }

    // Demo login - pada implementasi nyata akan menggunakan autentikasi backend
    toast.success(`Berhasil masuk sebagai ${role}!`);

    // Alihkan ke dashboard berdasarkan peran
    if (role === 'siswa') {
      navigate('/dashboard/siswa');
    } else if (role === 'guru') {
      navigate('/dashboard/guru');
    } else if (role === 'admin') {
      navigate('/dashboard/admin');
    }
  };

  return (
    <Layout noFooter>
      <div className="hero-pattern min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md border-2 border-kesehatan-biru/20">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-r from-kesehatan-biru to-kesehatan-hijau flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">PK</span>
            </div>
            <CardTitle className="text-2xl">Masuk ke PEDULIKECIL</CardTitle>
            <CardDescription>
              Pilih peran dan masuk untuk mengakses platform
            </CardDescription>
          </CardHeader>
          <Tabs defaultValue="siswa" value={role} onValueChange={setRole}>
            <TabsList className="grid grid-cols-3 w-full mb-6">
              <TabsTrigger value="siswa" className="flex flex-col items-center gap-1 py-2">
                <User size={16} />
                <span>Siswa</span>
              </TabsTrigger>
              <TabsTrigger value="guru" className="flex flex-col items-center gap-1 py-2">
                <Users size={16} />
                <span>Guru</span>
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex flex-col items-center gap-1 py-2">
                <Settings size={16} />
                <span>Admin</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="siswa">
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Nama Pengguna</Label>
                    <Input
                      id="username"
                      placeholder="Masukkan nama pengguna"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan kata sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-kesehatan-biru hover:bg-kesehatan-biru/90">
                    <LogIn size={16} className="mr-2" /> Masuk sebagai Siswa
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-center text-gray-500">
                <p className="w-full">Demo login siswa: siswa / password</p>
              </CardFooter>
            </TabsContent>

            <TabsContent value="guru">
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Nama Pengguna</Label>
                    <Input
                      id="username"
                      placeholder="Masukkan nama pengguna"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan kata sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-kesehatan-hijau hover:bg-kesehatan-hijau/90">
                    <LogIn size={16} className="mr-2" /> Masuk sebagai Guru
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-center text-gray-500">
                <p className="w-full">Demo login guru: guru / password</p>
              </CardFooter>
            </TabsContent>

            <TabsContent value="admin">
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Nama Pengguna</Label>
                    <Input
                      id="username"
                      placeholder="Masukkan nama pengguna"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Masukkan kata sandi"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <Button type="submit" className="w-full bg-kesehatan-kuning hover:bg-kesehatan-kuning/90">
                    <LogIn size={16} className="mr-2" /> Masuk sebagai Admin
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-sm text-center text-gray-500">
                <p className="w-full">Demo login admin: admin / password</p>
              </CardFooter>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
