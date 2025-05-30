
import { useState } from 'react';
import { VideoDownloader } from '@/components/VideoDownloader';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FeaturesSection } from '@/components/FeaturesSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent mb-4">
              YouTube to MP4 Converter
            </h1>
            <p className="text-xl text-gray-700 max-w-2xl mx-auto">
              Download your favorite YouTube videos in high-quality MP4 format. 
              Choose from multiple quality options and download instantly.
            </p>
          </div>
          <VideoDownloader />
          <FeaturesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
