'use server';

import type {
  CurrentWeather,
  ForecastDay,
  WeatherData,
  OpenWeatherCurrentResponse,
  OpenWeatherForecastResponse,
} from './types';

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  throw new Error('OPENWEATHER_API_KEY is not set in environment variables');
}

async function fetchCurrentWeather(city: string): Promise<CurrentWeather> {
  const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  
  const response = await fetch(url, { next: { revalidate: 300 } });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
    }
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeather API key.');
    }
    if (response.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  const data: OpenWeatherCurrentResponse = await response.json();

  return {
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    city: data.name,
    country: data.sys.country,
  };
}

async function fetchForecast(city: string): Promise<ForecastDay[]> {
  const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
  
  const response = await fetch(url, { next: { revalidate: 300 } });
  
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
    }
    if (response.status === 401) {
      throw new Error('Invalid API key. Please check your OpenWeather API key.');
    }
    if (response.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch forecast data: ${response.statusText}`);
  }

  const data: OpenWeatherForecastResponse = await response.json();

  // Group forecasts by day and get daily highs/lows
  const dailyData: Map<string, { highs: number[]; lows: number[]; icons: string[]; descriptions: string[]; dateTime: number }> = new Map();

  data.list.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dayKey = date.toDateString();
    
    if (!dailyData.has(dayKey)) {
      dailyData.set(dayKey, {
        
        lows: [],
        highs: [],
        icons: [],
        descriptions: [],
        dateTime: item.dt * 1000,
      });
    }

    const dayData = dailyData.get(dayKey)!;
    
    dayData.lows.push(item.main.temp_min);
    dayData.highs.push(item.main.temp_max);
    dayData.icons.push(item.weather[0].icon);
    dayData.descriptions.push(item.weather[0].description);
  });

  // Convert to ForecastDay array, taking max high, min low, and most common icon/description
  const forecast: ForecastDay[] = Array.from(dailyData.entries())
    .slice(0, 5)
    .map(([dayKey, dayData]) => {
      const date = new Date(dayData.dateTime);
      const high = Math.round(Math.max(...dayData.highs));
      const low = Math.round(Math.min(...dayData.lows));
      
      // Get most common icon (simple approach: use middle of day)
      const iconIndex = Math.floor(dayData.icons.length / 2);
      const icon = dayData.icons[iconIndex];
      const description = dayData.descriptions[iconIndex];

      return {
        date: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        high,
        low,
        icon,
        description,
        dateTime: dayData.dateTime,
      };
    });

  return forecast;
}

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    const [current, forecast] = await Promise.all([
      fetchCurrentWeather(city),
      fetchForecast(city),
    ]);

    return {
      current,
      forecast,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('An unexpected error occurred while fetching weather data');
  }
}

