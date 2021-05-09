import { DailyForecasts } from "./dailyForcasts";

export interface Weather {
  Key: string;
  LocalizedName: string;
  Date: Date,
  WeatherText: string,
  WeatherIcon: number,
  IsDayTime: boolean,
  celsius: number,
  Fahrenheit: number
  Temperature: {
    Metric: {
      Value: number,
      Unit: string,
      UnitType: number
    },
    Imperial: {
      Value: number,
      Unit: string,
      UnitType: number
    }
  },
  DailyForecasts: DailyForecasts

}