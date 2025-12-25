'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiAlertCircle, FiRefreshCw, FiHome } from 'react-icons/fi';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error('Weather Dashboard Error:', error);
  }, [error]);

  const getErrorMessage = () => {
    const message = error.message.toLowerCase();
    
    if (message.includes('not found') || message.includes('invalid city')) {
      return {
        title: 'City Not Found',
        description: 'The city you searched for could not be found. Please check the spelling and try again.',
      };
    }
    
    if (message.includes('api key') || message.includes('401')) {
      return {
        title: 'API Configuration Error',
        description: 'There is an issue with the API configuration. Please check your OpenWeather API key.',
      };
    }
    
    if (message.includes('rate limit') || message.includes('429')) {
      return {
        title: 'Rate Limit Exceeded',
        description: 'Too many requests. Please wait a moment and try again.',
      };
    }
    
    if (message.includes('network') || message.includes('fetch')) {
      return {
        title: 'Network Error',
        description: 'Unable to connect to the weather service. Please check your internet connection.',
      };
    }
    
    return {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred. Please try again.',
    };
  };

  const { title, description } = getErrorMessage();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
        <FiAlertCircle className="text-red-400 text-6xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <p className="text-gray-300 mb-6">{description}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleGoHome}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full text-white font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <FiHome className="text-lg" />
            Go Home
          </button>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-full text-white font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <FiRefreshCw className="text-lg" />
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}

