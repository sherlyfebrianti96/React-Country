export interface CountryType {
  name: string;
  topLevelDomain: Array<string>;
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: Array<string>;
  capital: string;
  altSpellings: Array<string>;
  region: string;
  continent: string;
  population: number;
  latlng: Array<number>;
  demonym: string;
  area: number;
  gini: number;
  timezones: Array<string>;
  borders: Array<string>;
  nativeName: string;
  numericCode: string;
  currencies: Array<{
    code: string;
    name: string;
    symbol: string;
  }>;
  languages: [
    {
      iso639_1: string;
      iso639_2: string;
      name: string;
      nativeName: string;
    }
  ],
  translations: {
    [countryLang: string]: string;
  },
  flags: Array<string>;
  regionalBlocs: Array<{
    acronym: string;
    name: string;
    otherAcronyms?: Array<string>;
    otherNames: Array<string>;
  }>;
  cioc: string;
  independent: boolean;
}