import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [HttpModule, CountriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
