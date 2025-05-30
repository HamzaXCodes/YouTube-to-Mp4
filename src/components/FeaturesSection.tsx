
import { Card, CardContent } from '@/components/ui/card';
import { Download, Shield, Zap, Video, Clock, Users } from 'lucide-react';

export const FeaturesSection = () => {
  const features = [
    {
      icon: <Download className="w-8 h-8 text-red-600" />,
      title: "High Quality Downloads",
      description: "Download videos in multiple quality options from 360p to 1080p HD"
    },
    {
      icon: <Zap className="w-8 h-8 text-red-600" />,
      title: "Fast & Reliable",
      description: "Lightning-fast downloads with 99.9% uptime reliability"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-600" />,
      title: "Safe & Secure",
      description: "No malware, no ads, completely safe and secure downloads"
    },
    {
      icon: <Video className="w-8 h-8 text-red-600" />,
      title: "MP4 Format",
      description: "All downloads are in universally compatible MP4 format"
    },
    {
      icon: <Clock className="w-8 h-8 text-red-600" />,
      title: "No Time Limits",
      description: "Download videos of any length without restrictions"
    },
    {
      icon: <Users className="w-8 h-8 text-red-600" />,
      title: "Free to Use",
      description: "Completely free service with no hidden charges or subscriptions"
    }
  ];

  return (
    <section className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Why Choose Our YouTube Downloader?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Experience the best YouTube to MP4 converter with these amazing features
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white">
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
