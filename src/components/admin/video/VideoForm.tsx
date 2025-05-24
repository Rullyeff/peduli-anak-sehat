
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface VideoFormProps {
  showDialog: boolean;
  setShowDialog: (show: boolean) => void;
  formData: {
    judul: string;
    deskripsi: string;
    url: string;
    kategori: string;
    thumbnail: string;
    durasi: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  editMode: boolean;
}

export const VideoForm: React.FC<VideoFormProps> = ({
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{editMode ? 'Edit Video Edukasi' : 'Tambah Video Edukasi'}</DialogTitle>
          <DialogDescription>
            {editMode ? 'Perbarui informasi video edukasi.' : 'Tambahkan video edukasi baru untuk siswa.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="judul" className="text-right">
                Judul Video
              </Label>
              <Input
                id="judul"
                name="judul"
                value={formData.judul}
                onChange={handleInputChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="kategori" className="text-right">
                Kategori
              </Label>
              <Select 
                value={formData.kategori} 
                onValueChange={(value) => handleSelectChange('kategori', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih Kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kesehatan">Kesehatan</SelectItem>
                  <SelectItem value="Gizi">Gizi</SelectItem>
                  <SelectItem value="Olahraga">Olahraga</SelectItem>
                  <SelectItem value="Kebersihan">Kebersihan</SelectItem>
                  <SelectItem value="Umum">Umum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                URL Video
              </Label>
              <Input
                id="url"
                name="url"
                type="url"
                value={formData.url}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="https://youtube.com/watch?v=..."
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="thumbnail" className="text-right">
                URL Thumbnail
              </Label>
              <Input
                id="thumbnail"
                name="thumbnail"
                type="url"
                value={formData.thumbnail}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="https://example.com/thumbnail.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="durasi" className="text-right">
                Durasi
              </Label>
              <Input
                id="durasi"
                name="durasi"
                value={formData.durasi}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="5:30"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="deskripsi" className="text-right">
                Deskripsi
              </Label>
              <Textarea
                id="deskripsi"
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder="Deskripsi video..."
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
              Batal
            </Button>
            <Button type="submit" className="bg-kesehatan-kuning hover:bg-kesehatan-kuning/90 text-white">
              {editMode ? 'Simpan Perubahan' : 'Tambah Video'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
