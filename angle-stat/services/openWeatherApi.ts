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
  };
}

type SearchParamsType = {
  appid: string;
  // exclude: Record<
  //   "current" | "minutely" | "hourly" | "daily" | "alerts",
  //   boolean
  // >;
  lang: string;
  // units: string;
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
      `?lat=${lat}&lon=${lon}&appid=${searchParams.appid}&units=metric`
    }),
  }),
});

export const { useGetWeatherQuery } = weatherApi;


// export const fetchWeather = (lat: number, lon: number) => {
//   const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
  
//   console.log('-fetch-');

//   fetch(`${baseUrl}lat=${lat}&lon=${lon}&appid=${defaultSearchParams.appid}`)
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`Error ${response.status}. ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then(data => console.log(data));
// }