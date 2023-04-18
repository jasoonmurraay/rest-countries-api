export interface NativeName {
  [key: string]: { official: string; common: string };
}

export interface Name {
  common: String;
  nativeName: NativeName;
  official: String;
}

export interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

export interface Languages {
  [key: string]: {
    [key: string]: string;
  };
}

export interface Flags {
  alt: string;
  png: string;
  svg: string;
}

export interface CountryData {
  altSpellings: Array<String>;
  area: Number;
  borders: Array<string>;
  capital: Array<string>;
  capitalInfo: Array<Number>;
  car: Object;
  cca2: String;
  cca3: String;
  ccn3: String;
  cioc: String;
  coatOfArms: Object;
  continents: Array<String>;
  currencies: Currencies;
  demonyms: Object;
  fifa: String;
  flag: String;
  flags: Flags;
  idd: Object;
  independent: Boolean;
  landlocked: Boolean;
  languages: Languages;
  latlng: Array<Number>;
  maps: Object;
  name: Name;
  population: number;
  region: String;
  startOfWeek: String;
  status: String;
  subregion: String;
  timezones: Array<String>;
  tld: Array<String>;
  translations: Object;
  unMember: Boolean;
}
