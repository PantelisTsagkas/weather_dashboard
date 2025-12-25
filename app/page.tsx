import { Suspense } from 'react';
import { getWeatherData } from './lib/weather';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastCards from './components/ForecastCards';
import TemperatureChart from './components/TemperatureChart';
import TemperatureToggle, { TemperatureProvider } from './components/TemperatureToggle';

interface PageProps {
  searchParams: Promise<{ city?: string }>;
}

async function WeatherContent({ city }: { city: string }) {
  const weatherData = await getWeatherData(city);

  return (
    <>
      <CurrentWeather data={weatherData.current} />
      <TemperatureChart forecast={weatherData.forecast} />
      <ForecastCards forecast={weatherData.forecast} />
    </>
  );
}

function WeatherContentSkeleton() {
  return (
    <>
      <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 animate-pulse">
        <div className="h-64"></div>
      </div>
      <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 animate-pulse">
        <div className="h-80"></div>
      </div>
      <div className="w-full animate-pulse">
        <div className="h-48"></div>
      </div>
    </>
  );
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const city = params.city || 'London';

  return (
    <TemperatureProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-white mb-4">Weather Dashboard</h1>
            <p className="text-gray-300 text-lg mb-8">Stay informed about weather conditions worldwide</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Suspense fallback={<div className="w-full max-w-2xl h-14 bg-white/10 rounded-full animate-pulse"></div>}>
                <SearchBar />
              </Suspense>
              <TemperatureToggle />
            </div>
          </div>

          {/* Weather Content */}
          <div className="max-w-7xl mx-auto space-y-8">
            <Suspense fallback={<WeatherContentSkeleton />}>
              <WeatherContent city={city} />
            </Suspense>
          </div>
        </div>
      </div>
    </TemperatureProvider>
  );
}
