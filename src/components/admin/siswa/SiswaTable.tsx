
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Siswa } from '@/types/siswa';

interface SiswaTableProps {
  siswaList: Siswa[];
  isLoading: boolean;
  searchTerm: string;
  onEdit: (siswa: Siswa) => void;
  onDelete: (id: string) => void;
}

export const SiswaTable: React.FC<SiswaTableProps> = ({
  siswaList, 
  isLoading, 
  searchTerm,
  onEdit,
  onDelete
}) => {
  const filteredSiswa = siswaList.filter(siswa => 
    siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    siswa.kelas.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (siswa.orang_tua_wali && siswa.orang_tua_wali.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Memuat data siswa...</p>
      </div>
    );
  }

  if (filteredSiswa.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Tidak ada siswa yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Kelas</TableHead>
              <TableHead>Orang Tua/Wali</TableHead>
              <TableHead>Nomor Kontak</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSiswa.map((siswa) => (
              <TableRow key={siswa.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-kesehatan-biru/20 flex items-center justify-center text-kesehatan-biru font-medium">
                      {siswa.nama.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{siswa.nama}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Kelas {siswa.kelas}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900">{siswa.orang_tua_wali || '-'}</div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {siswa.nomor_kontak || '-'}
                </TableCell>
                <TableCell className="text-sm text-gray-500 max-w-xs truncate">
                  {siswa.alamat || '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-blue-600"
                      onClick={() => onEdit(siswa)}
                    >
                      <Pencil size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => onDelete(siswa.id)}
                    >
                      <Trash2 size={16} />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
