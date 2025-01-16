import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import configuration from 'config/configuration';
import { validate } from 'config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate,
    }),
    HttpModule,
    CacheModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get('cache.ttl'),
        max: configService.get('cache.maxItems'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountriesModule {}
