
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GuruFormProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  formData: {
    nama: string;
    bidang_studi: string;
    wali_kelas: string;
    nomor_kontak: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editMode: boolean;
}

export const GuruForm: React.FC<GuruFormProps> = ({
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
          <DialogTitle>{editMode ? 'Edit Data Guru' : 'Tambah Guru Baru'}</DialogTitle>
          <DialogDescription>
            {editMode ? 'Perbarui informasi guru di sistem.' : 'Tambahkan guru baru ke dalam sistem.'}
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
              <Label htmlFor="bidang_studi" className="text-right">
                Bidang Studi
              </Label>
              <Input
                id="bidang_studi"
                name="bidang_studi"
                value={formData.bidang_studi}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Contoh: Matematika"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="wali_kelas" className="text-right">
                Wali Kelas
              </Label>
              <Select 
                value={formData.wali_kelas} 
                onValueChange={(value) => handleSelectChange('wali_kelas', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih Kelas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Bukan Wali Kelas</SelectItem>
                  <SelectItem value="6A">Kelas 6A</SelectItem>
                  <SelectItem value="6B">Kelas 6B</SelectItem>
                  <SelectItem value="5A">Kelas 5A</SelectItem>
                  <SelectItem value="5B">Kelas 5B</SelectItem>
                </SelectContent>
              </Select>
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
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90 text-white">
              {editMode ? 'Simpan Perubahan' : 'Tambah Guru'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
