'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTemperature } from './TemperatureToggle';
import type { ForecastDay } from '@/app/lib/types';

interface TemperatureChartProps {
  forecast: ForecastDay[];
}

export default function TemperatureChart({ forecast }: TemperatureChartProps) {
  const { convertTemp, unit } = useTemperature();

  const chartData = forecast.map((day) => ({
    date: day.date.split(',')[0], // Just the weekday
    high: convertTemp(day.high),
    low: convertTemp(day.low),
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-lg">
          <p className="text-gray-800 font-semibold mb-1">{payload[0].payload.date}</p>
          <p className="text-blue-600 text-sm">
            High: {payload[0].value}°{unit}
          </p>
          <p className="text-purple-600 text-sm">
            Low: {payload[1].value}°{unit}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
      <h3 className="text-2xl font-semibold text-white mb-6">Temperature Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
          <XAxis
            dataKey="date"
            stroke="rgba(255, 255, 255, 0.7)"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="rgba(255, 255, 255, 0.7)"
            style={{ fontSize: '12px' }}
            label={{ value: `°${unit}`, angle: -90, position: 'insideLeft', style: { fill: 'rgba(255, 255, 255, 0.7)' } }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}
            iconType="line"
          />
          <Line
            type="monotone"
            dataKey="high"
            stroke="#60a5fa"
            strokeWidth={2}
            dot={{ fill: '#60a5fa', r: 4 }}
            name="High"
          />
          <Line
            type="monotone"
            dataKey="low"
            stroke="#a78bfa"
            strokeWidth={2}
            dot={{ fill: '#a78bfa', r: 4 }}
            name="Low"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

