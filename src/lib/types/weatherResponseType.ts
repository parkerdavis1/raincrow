export interface WeatherResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    data: {
        dt: number;
        sunrise: number;
        sunset: number;
        temp: number;
        feels_like: number;
        pressure: number;
        humidity: number;
        dew_point: number;
        uvi: number;
        clouds: number;
        visibility: number;
        wind_speed: number;
        wind_deg: number;
        wind_gust?: number; // optional if not always present
        weather: {
            id: number;
            main: string;
            description: string;
            icon: string;
        }[];
    }[];
}
