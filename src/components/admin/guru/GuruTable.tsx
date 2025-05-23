
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { Guru } from '@/types/guru';

interface GuruTableProps {
  guruList: Guru[];
  isLoading: boolean;
  searchTerm: string;
  onEdit: (guru: Guru) => void;
  onDelete: (id: string) => void;
}

export const GuruTable: React.FC<GuruTableProps> = ({
  guruList, 
  isLoading, 
  searchTerm,
  onEdit,
  onDelete
}) => {
  const filteredGuru = guruList.filter(guru => 
    guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (guru.bidang_studi && guru.bidang_studi.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (guru.wali_kelas && guru.wali_kelas.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Memuat data guru...</p>
      </div>
    );
  }

  if (filteredGuru.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Tidak ada guru yang ditemukan</p>
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
              <TableHead>Bidang Studi</TableHead>
              <TableHead>Wali Kelas</TableHead>
              <TableHead>Nomor Kontak</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGuru.map((guru) => (
              <TableRow key={guru.id}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-kesehatan-kuning/20 flex items-center justify-center text-kesehatan-kuning font-medium">
                      {guru.nama.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{guru.nama}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900">{guru.bidang_studi || '-'}</div>
                </TableCell>
                <TableCell>
                  {guru.wali_kelas ? (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Kelas {guru.wali_kelas}
                    </Badge>
                  ) : (
                    <span className="text-sm text-gray-500">-</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {guru.nomor_kontak || '-'}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-blue-600"
                      onClick={() => onEdit(guru)}
                    >
                      <Pencil size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => onDelete(guru.id)}
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
