import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://api.open-meteo.com/v1/forecast",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

function getWeather(latitude, longitude) {
  const request = apiClient.get("", {
    params: {
      latitude,
      longitude,
      current_weather: true,
      hourly: "temperature_2m,relativehumidity_2m,windspeed_10m",
    },
  });
  return request.then((response) => response.data);
}

export default { getWeather };
