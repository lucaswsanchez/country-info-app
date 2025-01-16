import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountryInfo, CountryDetailedInfo } from './types';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('available')
  async getAvailableCountries(): Promise<CountryInfo[]> {
    return this.countriesService.getAvailableCountries();
  }

  @Get(':countryCode')
  async getCountryInfo(
    @Param('countryCode') countryCode: string,
  ): Promise<CountryDetailedInfo> {
    return this.countriesService.getCountryInfo(countryCode);
  }
}
