
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SiswaFormProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  formData: {
    nama: string;
    kelas: string;
    alamat: string;
    tanggal_lahir: string;
    orang_tua_wali: string;
    nomor_kontak: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editMode: boolean;
}

export const SiswaForm: React.FC<SiswaFormProps> = ({
  showDialog,
  setShowDialog,
  formData,
  handleInputChange,
  handleSelectChange,
  handleSubmit,
  editMode
}) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{editMode ? 'Edit Data Siswa' : 'Tambah Siswa Baru'}</DialogTitle>
          <DialogDescription>
            {editMode ? 'Perbarui informasi siswa di sistem.' : 'Tambahkan siswa baru ke dalam sistem.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nama" className="text-right">
                Nama Lengkap
              </Label>
              <Input
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kelas" className="text-right">
                Kelas
              </Label>
              <Select 
                value={formData.kelas} 
                onValueChange={(value) => handleSelectChange('kelas', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6A">Kelas 6A</SelectItem>
                  <SelectItem value="6B">Kelas 6B</SelectItem>
                  <SelectItem value="5A">Kelas 5A</SelectItem>
                  <SelectItem value="5B">Kelas 5B</SelectItem>
                  <SelectItem value="4A">Kelas 4A</SelectItem>
                  <SelectItem value="4B">Kelas 4B</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="orang_tua_wali" className="text-right">
                Orang Tua/Wali
              </Label>
              <Input
                id="orang_tua_wali"
                name="orang_tua_wali"
                value={formData.orang_tua_wali}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Nama orang tua/wali"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tanggal_lahir" className="text-right">
                Tanggal Lahir
              </Label>
              <Input
                id="tanggal_lahir"
                name="tanggal_lahir"
                type="date"
                value={formData.tanggal_lahir}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nomor_kontak" className="text-right">
                Nomor Kontak
              </Label>
              <Input
                id="nomor_kontak"
                name="nomor_kontak"
                value={formData.nomor_kontak}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Contoh: 081234567890"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="alamat" className="text-right">
                Alamat
              </Label>
              <Input
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Alamat lengkap"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90 text-white">
              {editMode ? 'Simpan Perubahan' : 'Tambah Siswa'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
