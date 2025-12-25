'use client';

import { useTemperature } from './TemperatureToggle';
import type { CurrentWeather as CurrentWeatherType } from '@/app/lib/types';
import WeatherIcon from './WeatherIcon';
import { useEffect, useState } from 'react';

interface CurrentWeatherProps {
  data: CurrentWeatherType;
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  const { convertTemp } = useTemperature();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-pulse">
        <div className="h-64"></div>
      </div>
    );
  }

  const displayTemp = convertTemp(data.temp);
  const displayFeelsLike = convertTemp(data.feelsLike);

  return (
    <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 transition-all hover:bg-white/15">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-semibold text-white mb-2">
            {data.city}, {data.country}
          </h2>
          <p className="text-gray-300 capitalize mb-4">{data.description}</p>
          <div className="flex items-baseline gap-2">
            <span className="text-7xl font-bold text-white">{displayTemp}</span>
            <span className="text-3xl text-gray-300">°</span>
          </div>
          <p className="text-gray-300 mt-2">Feels like {displayFeelsLike}°</p>
        </div>

        <div className="text-white flex-shrink-0">
          <WeatherIcon iconCode={data.icon} size={120} />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-white/20">
        <div>
          <p className="text-gray-400 text-sm mb-1">Humidity</p>
          <p className="text-white text-xl font-semibold">{data.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-400 text-sm mb-1">Wind Speed</p>
          <p className="text-white text-xl font-semibold">{data.windSpeed} km/h</p>
        </div>
      </div>
    </div>
  );
}

