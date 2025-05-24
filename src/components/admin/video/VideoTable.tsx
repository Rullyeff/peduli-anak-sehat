
import React from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Play } from 'lucide-react';
import { Video } from '@/types/video';

interface VideoTableProps {
  videos: Video[];
  isLoading: boolean;
  searchTerm: string;
  onEdit: (video: Video) => void;
  onDelete: (id: string) => void;
}

export const VideoTable: React.FC<VideoTableProps> = ({
  videos, 
  isLoading, 
  searchTerm,
  onEdit,
  onDelete
}) => {
  const filteredVideos = videos.filter(video => 
    video.judul.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.kategori.toLowerCase().includes(searchTerm.toLowerCase()) ||
    video.deskripsi.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <p>Memuat data video...</p>
      </div>
    );
  }

  if (filteredVideos.length === 0) {
    return (
      <div className="text-center py-8">
        <p>Tidak ada video yang ditemukan</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnail</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVideos.map((video) => (
              <TableRow key={video.id}>
                <TableCell>
                  <div className="h-16 w-24 bg-gray-100 rounded flex items-center justify-center">
                    {video.thumbnail ? (
                      <img src={video.thumbnail} alt={video.judul} className="h-full w-full object-cover rounded" />
                    ) : (
                      <Play className="text-gray-400" size={24} />
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-xs">
                    <div className="text-sm font-medium text-gray-900 truncate">{video.judul}</div>
                    <div className="text-xs text-gray-500 truncate">{video.deskripsi}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {video.kategori}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {video.durasi || '-'}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {new Date(video.created_at).toLocaleDateString('id-ID')}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-blue-600"
                      onClick={() => onEdit(video)}
                    >
                      <Pencil size={16} />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 text-red-600"
                      onClick={() => onDelete(video.id)}
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
