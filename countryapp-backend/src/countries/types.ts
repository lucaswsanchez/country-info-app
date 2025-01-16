export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: string[];
}

export interface PopulationData {
  year: number;
  value: number;
}

export interface PopulationResponse {
  error: boolean;
  msg: string;
  data: {
    country: string;
    code: string;
    populationCounts: PopulationData[];
  };
}

export interface FlagResponse {
  error: boolean;
  msg: string;
  data: {
    flag: string;
    name: string;
  };
}

export interface CountryDetailedInfo {
  borders: string[];
  populationData: PopulationData[];
  flagUrl: string;
  commonName: string;
  officialName: string;
}
