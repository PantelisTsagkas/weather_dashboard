declare module 'react-animated-weather' {
  import { Component } from 'react';

  interface ReactAnimatedWeatherProps {
    icon: 
      | 'CLEAR_DAY'
      | 'CLEAR_NIGHT'
      | 'PARTLY_CLOUDY_DAY'
      | 'PARTLY_CLOUDY_NIGHT'
      | 'CLOUDY'
      | 'RAIN'
      | 'SLEET'
      | 'SNOW'
      | 'WIND'
      | 'FOG';
    color?: string;
    size?: number;
    animate?: boolean;
  }

  export default class ReactAnimatedWeather extends Component<ReactAnimatedWeatherProps> {}
}

