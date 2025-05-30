
import { Youtube } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-red-100">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 p-2 rounded-lg">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <div className="text-2xl font-bold text-red-600">
              YouTube to MP4
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
