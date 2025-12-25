'use client';

import { useState } from 'react';
import { useTemperature } from './TemperatureToggle';
import type { ForecastDay } from '@/app/lib/types';
import WeatherIcon from './WeatherIcon';

interface ForecastCardsProps {
  forecast: ForecastDay[];
}

export default function ForecastCards({ forecast }: ForecastCardsProps) {
  const { convertTemp } = useTemperature();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="w-full">
      <h3 className="text-2xl font-semibold text-white mb-6">5-Day Forecast</h3>
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {forecast.map((day, index) => {
          const displayHigh = convertTemp(day.high);
          const displayLow = convertTemp(day.low);
          const isSelected = selectedIndex === index;

          return (
            <button
              key={index}
              onClick={() => setSelectedIndex(isSelected ? null : index)}
              className={`flex-shrink-0 w-40 bg-white/10 backdrop-blur-md border rounded-xl p-4 transition-all hover:bg-white/15 hover:scale-105 ${
                isSelected
                  ? 'border-white/40 bg-white/20 ring-2 ring-white/30'
                  : 'border-white/20'
              }`}
            >
              <p className="text-gray-300 text-sm mb-2">{day.date}</p>
              <div className="flex justify-center mb-3">
                <WeatherIcon iconCode={day.icon} size={64} />
              </div>
              <p className="text-gray-400 text-xs capitalize mb-2 truncate">{day.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-white text-xl font-semibold">{displayHigh}°</span>
                <span className="text-gray-400 text-lg">{displayLow}°</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

