'use client';

import { FiAlertCircle, FiX } from 'react-icons/fi';
import { useRouter } from 'next/navigation';

interface WeatherErrorProps {
  error: Error;
  onDismiss?: () => void;
}

export default function WeatherError({ error, onDismiss }: WeatherErrorProps) {
  const router = useRouter();

  const getErrorMessage = () => {
    const message = error.message.toLowerCase();
    
    if (message.includes('not found') || message.includes('invalid city')) {
      return {
        title: 'City Not Found',
        description: 'The city you searched for could not be found. Please check the spelling and try again.',
        isCityError: true,
      };
    }
    
    if (message.includes('api key') || message.includes('401')) {
      return {
        title: 'API Configuration Error',
        description: 'There is an issue with the API configuration. Please check your OpenWeather API key.',
        isCityError: false,
      };
    }
    
    if (message.includes('rate limit') || message.includes('429')) {
      return {
        title: 'Rate Limit Exceeded',
        description: 'Too many requests. Please wait a moment and try again.',
        isCityError: false,
      };
    }
    
    if (message.includes('network') || message.includes('fetch')) {
      return {
        title: 'Network Error',
        description: 'Unable to connect to the weather service. Please check your internet connection.',
        isCityError: false,
      };
    }
    
    return {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred. Please try again.',
      isCityError: false,
    };
  };

  const { title, description, isCityError } = getErrorMessage();

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else if (isCityError) {
      router.push('/');
    }
  };

  return (
    <div className="w-full bg-red-500/10 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <FiAlertCircle className="text-red-400 text-2xl flex-shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-gray-300">{description}</p>
        </div>
        <button
          onClick={handleDismiss}
          className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
          aria-label="Dismiss error"
        >
          <FiX className="text-xl" />
        </button>
      </div>
    </div>
  );
}

