
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  description: string;
  youtubeUrl: string;
  kelas: string;
  active: boolean;
}

interface VideoSectionProps {
  videos: Video[];
}

const VideoSection: React.FC<VideoSectionProps> = ({ videos }) => {
  const getYouTubeEmbedUrl = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const activeVideos = videos.filter(video => video.active);

  if (activeVideos.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5" />
            Video Edukasi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            Belum ada video edukasi yang tersedia
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5" />
          Video Edukasi
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activeVideos.map((video) => {
            const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);
            
            return (
              <div key={video.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold">{video.title}</h3>
                  <Badge variant="secondary">{video.kelas}</Badge>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{video.description}</p>
                
                {embedUrl ? (
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={embedUrl}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">URL video tidak valid</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoSection;
