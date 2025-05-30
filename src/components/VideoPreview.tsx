
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Play, Clock, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface VideoPreviewProps {
  videoData: any;
}

export const VideoPreview = ({ videoData }: VideoPreviewProps) => {
  const handleDownloadClick = (url: string, quality: string) => {
    try {
      // Create a temporary link element to trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `video_${quality}.mp4`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `Downloading video in ${quality} quality`,
      });
    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Error",
        description: "Unable to start download. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Extract video information from the API response
  const videoInfo = videoData?.video || videoData;
  const downloadLinks = videoData?.links || videoData?.formats || [];

  return (
    <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Play className="w-5 h-5 text-red-600" />
          <span>Video Preview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {videoInfo && (
          <div className="flex flex-col lg:flex-row gap-6">
            {videoInfo.thumbnail && (
              <div className="lg:w-1/3">
                <img 
                  src={videoInfo.thumbnail} 
                  alt="Video thumbnail"
                  className="w-full rounded-lg shadow-md"
                />
              </div>
            )}
            
            <div className="lg:w-2/3 space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {videoInfo.title || 'Video Title'}
                </h3>
                <p className="text-gray-600">
                  {videoInfo.description || 'No description available'}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {videoInfo.duration && (
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{videoInfo.duration}</span>
                  </div>
                )}
                {videoInfo.views && (
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>{videoInfo.views} views</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="border-t pt-6">
          <h4 className="text-lg font-semibold mb-4">Available Downloads</h4>
          
          {downloadLinks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {downloadLinks.map((link: any, index: number) => (
                <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {link.quality || `Quality ${index + 1}`}
                      </Badge>
                      <p className="text-sm text-gray-600">
                        {link.format || 'MP4'} • {link.size || 'Unknown size'}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleDownloadClick(link.url || link.link, link.quality || `quality_${index + 1}`)}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No download links available. The API might have returned different data structure.</p>
              <p className="text-sm mt-2">Check the console for the complete API response.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
