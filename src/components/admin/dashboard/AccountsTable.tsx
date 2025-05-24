
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, User } from 'lucide-react';

interface Account {
  id: string;
  nama: string;
  role: 'siswa' | 'guru';
  kelas?: string;
  bidang_studi?: string;
  wali_kelas?: string;
  nomor_kontak?: string;
  created_at: string;
}

interface AccountsTableProps {
  accounts: Account[];
  isLoading: boolean;
  searchTerm: string;
  activeTab: string;
  onEdit: (account: Account) => void;
  onDelete: (id: string, role: string) => void;
}

export const AccountsTable: React.FC<AccountsTableProps> = ({
  accounts, 
  isLoading, 
  searchTerm,
  activeTab,
  onEdit,
  onDelete
}) => {
  const filteredAccounts = accounts.filter(account => {
    const matchesSearch = account.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (account.kelas && account.kelas.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (account.bidang_studi && account.bidang_studi.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === 'semua' || account.role === activeTab;
    return matchesSearch && matchesTab;
  });

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Memuat data akun...</p>
      </div>
    );
  }

  if (filteredAccounts.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Tidak ada akun yang ditemukan</p>
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
              <TableHead>Role</TableHead>
              <TableHead>Kelas/Bidang Studi</TableHead>
              <TableHead>Nomor Kontak</TableHead>
              <TableHead>Tanggal Bergabung</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.map((account) => (
              <TableRow key={`${account.role}-${account.id}`}>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-kesehatan-biru/20 flex items-center justify-center text-kesehatan-biru font-medium">
                      <User size={16} />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{account.nama}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={account.role === 'siswa' 
                      ? "bg-blue-50 text-blue-700 border-blue-200" 
                      : "bg-green-50 text-green-700 border-green-200"
                    }
                  >
                    {account.role === 'siswa' ? 'Siswa' : 'Guru'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm text-gray-900">
                    {account.role === 'siswa' 
                      ? `Kelas ${account.kelas}` 
                      : account.bidang_studi || '-'
                    }
                    {account.role === 'guru' && account.wali_kelas && (
                      <div className="text-xs text-gray-500">Wali Kelas {account.wali_kelas}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {account.nomor_kontak || '-'}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(account.created_at).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-blue-600"
                      onClick={() => onEdit(account)}
                    >
                      <Pencil size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => onDelete(account.id, account.role)}
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
