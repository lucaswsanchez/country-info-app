import axios from "axios";
import { Country, CountryDetailedInfo } from "../types";

const API_BASE_URL = "http://localhost:4000";
export const api = {
  async getCountries(): Promise<Country[]> {
    const response = await axios.get(`${API_BASE_URL}/countries/available`);
    return response.data;
  },

  async getCountryInfo(countryCode: string): Promise<CountryDetailedInfo> {
    const response = await axios.get(
      `${API_BASE_URL}/countries/${countryCode}`
    );
    return response.data;
  },
};
