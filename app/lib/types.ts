export interface CurrentWeather {
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  description: string;
  icon: string;
  city: string;
  country: string;
}

export interface ForecastDay {
  date: string;
  high: number;
  low: number;
  icon: string;
  description: string;
  dateTime: number;
}

export interface WeatherData {
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export interface OpenWeatherCurrentResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
}

export interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      main: string;
      description: string;
      icon: string;
    }>;
  }>;
}

