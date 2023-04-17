import axios from "axios";

interface NativeName {
  [key: string]: { official: string; common: string };
}

interface Name {
  common: String;
  nativeName: NativeName;
  official: String;
}

interface Currencies {
  [key: string]: {
    name: string;
    symbol: string;
  };
}

interface Languages {
  [key: string]: {
    [key: string]: string;
  };
}

interface Flags {
  alt: string;
  png: string;
  svg: string;
}

interface CountryData {
  altSpellnigs: Array<String>;
  area: Number;
  borders: Array<string>;
  capital: Array<String>;
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

const getBorders = async (borders: string[]) => {
  let finalData: CountryData[] = [];
  for (let i = 0; i < borders.length; i++) {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha/${borders[i]}`
    );

    finalData.push(response.data[0]);
  }

  return finalData;
};

export default getBorders;
