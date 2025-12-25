'use client';

import { useState, useEffect, createContext, useContext } from 'react';

type TemperatureUnit = 'C' | 'F';

interface TemperatureContextType {
  unit: TemperatureUnit;
  toggleUnit: () => void;
  convertTemp: (celsius: number) => number;
}

const TemperatureContext = createContext<TemperatureContextType | undefined>(undefined);

export function TemperatureProvider({ children }: { children: React.ReactNode }) {
  const [unit, setUnit] = useState<TemperatureUnit>('C');

  useEffect(() => {
    const savedUnit = localStorage.getItem('temperatureUnit') as TemperatureUnit | null;
    if (savedUnit === 'C' || savedUnit === 'F') {
      setUnit(savedUnit);
    }
  }, []);

  const toggleUnit = () => {
    const newUnit = unit === 'C' ? 'F' : 'C';
    setUnit(newUnit);
    localStorage.setItem('temperatureUnit', newUnit);
  };

  const convertTemp = (celsius: number): number => {
    if (unit === 'F') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return celsius;
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit, convertTemp }}>
      {children}
    </TemperatureContext.Provider>
  );
}

export function useTemperature() {
  const context = useContext(TemperatureContext);
  if (context === undefined) {
    throw new Error('useTemperature must be used within a TemperatureProvider');
  }
  return context;
}

export default function TemperatureToggle() {
  const { unit, toggleUnit } = useTemperature();

  return (
    <button
      onClick={toggleUnit}
      className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-white/30"
      aria-label={`Switch to ${unit === 'C' ? 'Fahrenheit' : 'Celsius'}`}
    >
      °{unit}
    </button>
  );
}

