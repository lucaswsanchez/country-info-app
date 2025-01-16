export interface Country {
  name: string;
  countryCode: string;
}

export interface BorderCountry {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null | BorderCountry[];
}

export interface PopulationData {
  year: number;
  value: number;
}

export interface CountryDetailedInfo {
  borders: BorderCountry[];
  populationData: PopulationData[];
  flagUrl: string;
  commonName: string;
  officialName: string;
}
