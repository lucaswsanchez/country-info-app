import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';
import {
  CountryInfo,
  PopulationResponse,
  FlagResponse,
  CountryDetailedInfo,
} from './types';

@Injectable()
export class CountriesService {
  private readonly COUNTRY_CODE_REGEX = /^[A-Z]{2}$/;
  private readonly nagerApiUrl: string;
  private readonly countriesNowApiUrl: string;
  private readonly cacheTtl: number;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.nagerApiUrl = this.configService.get<string>('nagerApi.url');
    this.countriesNowApiUrl = this.configService.get<string>(
      'countriesNowApi.url',
    );
    this.cacheTtl = this.configService.get<number>('cache.ttl');
  }

  private validateCountryCode(countryCode: string): void {
    if (!this.COUNTRY_CODE_REGEX.test(countryCode)) {
      throw new HttpException(
        'Invalid country code format. Please use ISO 3166-1 alpha-2 format (e.g., US, GB)',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private handleApiError(error: any, context: string): never {
    if (error instanceof HttpException) {
      throw error;
    }

    const status = error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = error.response?.data?.message || `Failed to ${context}`;

    throw new HttpException(
      {
        status,
        error: message,
        context,
      },
      status,
    );
  }

  async getAvailableCountries(): Promise<CountryInfo[]> {
    const cacheKey = 'available_countries';

    const cachedData = await this.cacheManager.get<CountryInfo[]>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get<CountryInfo[]>(
          `${this.nagerApiUrl}/AvailableCountries`,
        ),
      );

      await this.cacheManager.set(cacheKey, response.data, this.cacheTtl);

      return response.data;
    } catch (error) {
      this.handleApiError(error, 'fetch available countries');
    }
  }

  async getCountryInfo(countryCode: string): Promise<CountryDetailedInfo> {
    this.validateCountryCode(countryCode);

    const cacheKey = `country_info_${countryCode}`;

    const cachedData =
      await this.cacheManager.get<CountryDetailedInfo>(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const countryInfoResponse = await firstValueFrom(
        this.httpService.get<CountryInfo>(
          `${this.nagerApiUrl}/CountryInfo/${countryCode}`,
        ),
      );

      const countryName = countryInfoResponse.data.commonName;

      const [populationResponse, flagResponse] = await Promise.all([
        firstValueFrom(
          this.httpService.post<PopulationResponse>(
            `${this.countriesNowApiUrl}/countries/population`,
            {
              country: countryName,
            },
          ),
        ),
        firstValueFrom(
          this.httpService.post<FlagResponse>(
            `${this.countriesNowApiUrl}/countries/flag/images`,
            {
              country: countryName,
            },
          ),
        ),
      ]);

      const result: CountryDetailedInfo = {
        borders: countryInfoResponse.data.borders,
        populationData: populationResponse.data.data.populationCounts,
        flagUrl: flagResponse.data.data.flag,
        commonName: countryInfoResponse.data.commonName,
        officialName: countryInfoResponse.data.officialName,
      };

      await this.cacheManager.set(cacheKey, result, this.cacheTtl);

      return result;
    } catch (error) {
      if (error.response?.status === 404) {
        throw new HttpException(
          `Country with code ${countryCode} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      this.handleApiError(error, 'fetch country information');
    }
  }
}
