'use client';

import {
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudSun,
  CloudMoon,
  CloudSunRain,
  CloudMoonRain,
  CloudLightning,
  Snowflake,
  CloudFog,
  Wind,
} from 'lucide-react';

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  className?: string;
}

// Map OpenWeather icon codes to Lucide React icons with colors
const iconMap: Record<string, { Icon: any; color: string; animate?: string }> = {
  '01d': { Icon: Sun, color: '#FFD700', animate: 'spin-slow' }, // Golden sun
  '01n': { Icon: Moon, color: '#E6E6FA', animate: 'pulse' }, // Lavender moon
  '02d': { Icon: CloudSun, color: '#87CEEB', animate: 'float' }, // Sky blue
  '02n': { Icon: CloudMoon, color: '#9370DB', animate: 'float' }, // Medium purple
  '03d': { Icon: Cloud, color: '#B0C4DE', animate: 'float' }, // Light steel blue
  '03n': { Icon: Cloud, color: '#778899', animate: 'float' }, // Light slate gray
  '04d': { Icon: Cloud, color: '#708090', animate: 'float' }, // Slate gray
  '04n': { Icon: Cloud, color: '#696969', animate: 'float' }, // Dim gray
  '09d': { Icon: CloudRain, color: '#4682B4', animate: 'bounce' }, // Steel blue
  '09n': { Icon: CloudRain, color: '#4169E1', animate: 'bounce' }, // Royal blue
  '10d': { Icon: CloudSunRain, color: '#6495ED', animate: 'bounce' }, // Cornflower blue
  '10n': { Icon: CloudMoonRain, color: '#483D8B', animate: 'bounce' }, // Dark slate blue
  '11d': { Icon: CloudLightning, color: '#9370DB', animate: 'flash' }, // Medium purple
  '11n': { Icon: CloudLightning, color: '#8A2BE2', animate: 'flash' }, // Blue violet
  '13d': { Icon: Snowflake, color: '#E0E0E0', animate: 'spin-slow' }, // Light gray
  '13n': { Icon: Snowflake, color: '#D3D3D3', animate: 'spin-slow' }, // Light gray
  '50d': { Icon: CloudFog, color: '#C0C0C0', animate: 'fade' }, // Silver
  '50n': { Icon: CloudFog, color: '#A9A9A9', animate: 'fade' }, // Dark gray
};

export default function WeatherIcon({ 
  iconCode, 
  size = 80, 
  className = '' 
}: WeatherIconProps) {
  const iconConfig = iconMap[iconCode] || iconMap['01d'];
  const { Icon, color, animate } = iconConfig;
  
  const animateClass = animate ? {
    'spin-slow': 'animate-spin-slow',
    'float': 'animate-float',
    'bounce': 'animate-bounce',
    'flash': 'animate-flash',
    'fade': 'animate-fade',
    'pulse': 'animate-pulse',
  }[animate] || '' : '';
  
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <Icon
        size={size}
        color={color}
        strokeWidth={1.5}
        className={`drop-shadow-lg ${animateClass}`}
        style={{
          filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))',
        }}
      />
    </div>
  );
}
