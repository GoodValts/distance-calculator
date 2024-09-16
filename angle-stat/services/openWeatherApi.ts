import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface WeatherApiInterFace {
  getWeather: {
    coord: {
      lon: number;
      lat: number;
    };
    weather: [
      {
        id: number;
        main: string;
        description: string;
        icon: string;
      },
    ];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
      sea_level: number;
      grnd_level: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    rain: {
      "1h": number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
      type: number;
      id: number;
      country: string;
      sunrise: number;
      sunset: number;
    };
    timezone: number;
    id: number;
    name: string;
    cod: number;
  };
}

type SearchParamsType = {
  appid: string;
  lang: string;
};

const defaultSearchParams: SearchParamsType = {
  appid: "08f2a575dda978b9c539199e54df03b0",
  lang: "en",
};

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
  }),
  endpoints: (builder) => ({
    getWeather: builder.query<
      WeatherApiInterFace["getWeather"],
      { lat: number; lon: number; searchParams?: SearchParamsType }
    >({
      query: ({ lat, lon, searchParams = defaultSearchParams }) =>
        `?lat=${lat}&lon=${lon}&appid=${searchParams.appid}&units=metric`,
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;
