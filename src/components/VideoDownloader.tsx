
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Download, Loader2, Youtube, AlertCircle, Play, Clock, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { extractVideoId } from '@/utils/youtube';
import { downloadVideo } from '@/services/youtube-api';

export const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [videoData, setVideoData] = useState(null);
  const [selectedQuality, setSelectedQuality] = useState('720p');
  const [showPreview, setShowPreview] = useState(false);

  const qualityOptions = [
    { value: '1080p', label: '1080p HD', description: 'Full HD Quality' },
    { value: '720p', label: '720p HD', description: 'High Quality' },
    { value: '480p', label: '480p SD', description: 'Standard Quality' },
    { value: '360p', label: '360p', description: 'Basic Quality' },
  ];

  const handlePreview = async () => {
    if (!url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a YouTube URL",
        variant: "destructive",
      });
      return;
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid YouTube URL",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Fetching video preview for ID:', videoId);
      const data = await downloadVideo(videoId);
      console.log('Video data received:', data);
      setVideoData(data);
      setShowPreview(true);
      
      toast({
        title: "Success!",
        description: "Video preview loaded successfully",
      });
    } catch (error) {
      console.error('Preview error:', error);
      toast({
        title: "Preview Failed",
        description: "Unable to fetch video preview. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!videoData) {
      toast({
        title: "Error",
        description: "Please preview the video first",
        variant: "destructive",
      });
      return;
    }

    try {
      const downloadLinks = videoData?.links || videoData?.formats || [];
      const qualityLink = downloadLinks.find((link: any) => 
        link.quality?.includes(selectedQuality) || link.format?.includes(selectedQuality)
      ) || downloadLinks[0];

      if (!qualityLink) {
        toast({
          title: "Error",
          description: "No download link available for selected quality",
          variant: "destructive",
        });
        return;
      }

      const link = document.createElement('a');
      link.href = qualityLink.url || qualityLink.link;
      link.download = `video_${selectedQuality}.mp4`;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: `Downloading video in ${selectedQuality} quality`,
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

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    if (showPreview) {
      setShowPreview(false);
      setVideoData(null);
    }
  };

  // Extract video information from the API response with better thumbnail handling
  const videoInfo = videoData?.video || videoData;
  const thumbnailUrl = videoInfo?.thumbnail || 
                      videoInfo?.thumbnails?.high?.url || 
                      videoInfo?.thumbnails?.medium?.url || 
                      videoInfo?.thumbnails?.default?.url ||
                      (videoInfo?.id ? `https://img.youtube.com/vi/${videoInfo.id}/maxresdefault.jpg` : null);

  return (
    <div className="space-y-8">
      <Card className="shadow-xl border-0 bg-white">
        <CardHeader className="text-center bg-red-50">
          <CardTitle className="flex items-center justify-center space-x-2 text-2xl">
            <Youtube className="w-6 h-6 text-red-600" />
            <span className="text-red-600">
              Enter YouTube URL
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={handleUrlChange}
              className="flex-1 h-12 text-lg border-red-200 focus:border-red-400 focus:ring-red-400"
              disabled={loading}
            />
            <Button 
              onClick={handlePreview}
              disabled={loading || !url.trim()}
              className="h-12 px-8 bg-red-600 hover:bg-red-700 text-white font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Preview Video
                </>
              )}
            </Button>
          </div>
          
          <div className="bg-gradient-to-r from-red-50 to-white border-l-4 border-red-500 rounded-lg p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <Youtube className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800 mb-3">How to use YouTube Downloader</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span className="text-red-700 font-medium">Copy YouTube video URL</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span className="text-red-700 font-medium">Paste URL in the input field</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span className="text-red-700 font-medium">Click "Preview Video"</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                    <span className="text-red-700 font-medium">Select quality and download</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {showPreview && videoData && (
        <Card className="shadow-xl border-0 bg-white">
          <CardHeader className="bg-red-50">
            <CardTitle className="flex items-center space-x-2">
              <Play className="w-5 h-5 text-red-600" />
              <span className="text-red-600">
                Video Preview
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            {videoInfo && (
              <div className="flex flex-col lg:flex-row gap-6">
                {thumbnailUrl && (
                  <div className="lg:w-2/3">
                    <img 
                      src={thumbnailUrl} 
                      alt="Video thumbnail"
                      className="w-full rounded-lg shadow-md border border-red-100"
                      onError={(e) => {
                        // Fallback to standard YouTube thumbnail
                        const videoId = extractVideoId(url);
                        if (videoId) {
                          e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                        }
                      }}
                    />
                  </div>
                )}
                
                <div className="lg:w-1/3 space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {videoInfo.title || 'Video Title'}
                    </h3>
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

            <div className="border-t border-red-100 pt-6">
              <h4 className="text-lg font-semibold mb-6 text-red-600">
                Download Options
              </h4>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select Quality
                  </label>
                  <RadioGroup 
                    value={selectedQuality} 
                    onValueChange={setSelectedQuality}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {qualityOptions.map((quality) => (
                      <div key={quality.value} className="flex items-center space-x-3">
                        <RadioGroupItem 
                          value={quality.value} 
                          id={quality.value}
                          className="border-red-300 text-red-600"
                        />
                        <Label 
                          htmlFor={quality.value}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-red-50 hover:border-red-200 transition-colors">
                            <div className="font-semibold text-gray-900">
                              {quality.label}
                            </div>
                            <div className="text-sm text-gray-600">
                              {quality.description}
                            </div>
                          </div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <Button 
                  onClick={handleDownload}
                  className="w-full h-12 bg-red-600 hover:bg-red-700 text-white font-semibold text-lg"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download {selectedQuality}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
