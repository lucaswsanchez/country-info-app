export default () => ({
  nagerApi: {
    url: process.env.NAGER_API_URL,
  },
  countriesNowApi: {
    url: process.env.COUNTRIES_NOW_API_URL,
  },
  cache: {
    ttl: parseInt(process.env.CACHE_TTL, 10) || 3600,
    maxItems: parseInt(process.env.CACHE_MAX_ITEMS, 10) || 100,
  },
});
