import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import axios from "axios";
import getBorders from "../api/getBorders";
import Link from "next/link";
import Navbar from "@/components/Navbar";

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

interface Data {
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

const CountryPage = () => {
  const [data, setData] = useState<Data>();
  const [borders, setBorders] = useState<Data[]>();
  const router = useRouter();
  const query = router.query.Id;
  useEffect(() => {
    if (query) {
      const getCountryData = async () => {
        await axios
          .get(`https://restcountries.com/v3.1/alpha/${query}`)
          .then((data) => {
            console.log(data.data[0]);
            setData(data.data[0]);
          });
      };
      getCountryData();
    }
  }, [query]);
  useEffect(() => {
    if (data && data.borders) {
      getBorders(data.borders).then((data) => setBorders(data));
    }
  }, [data]);
  const renderLanguages = () => {
    let string = "";
    if (data?.languages) {
      for (let i = 0; i < Object.values(data?.languages).length; i++) {
        string +=
          Object.values(data?.languages)[i] +
          (i === Object.values(data?.languages).length - 1 ? "" : ", ");
      }
    }
    return string;
  };
  const renderCurrencies = () => {
    let string = "";
    if (data?.currencies) {
      for (let i = 0; i < Object.values(data?.currencies).length; i++) {
        string +=
          Object.values(data?.currencies)[i].name +
          (i === Object.values(data?.currencies).length - 1 ? "" : ", ");
      }
    }
    return string;
  };
  const renderNativeNames = () => {
    let string = "";
    if (data?.name.nativeName) {
      let nativeNames = data.name.nativeName;
      for (let i = 0; i < Object.values(nativeNames).length; i++) {
        string +=
          Object.values(nativeNames)[i].common +
          (i === Object.values(nativeNames).length - 1 ? "" : ", ");
      }
    }
    return string;
  };

  const renderBorders = () => {
    return borders?.map((country) => {
      return <li>{country.name.common}</li>;
    });
  };

  return (
    <>
      <Navbar />
      {data && (
        <div>
          <Link href="/">
            <button>&larr; Back</button>
          </Link>
          <main>
            <img src={data.flags.png} />
            <h1>{data.name.common}</h1>
            {data.name.nativeName && (
              <p>
                <span>
                  {Object.values(data?.name.nativeName).length > 1
                    ? "Native Names: "
                    : "Native Name: "}{" "}
                </span>
                {renderNativeNames()}
              </p>
            )}

            <p>
              <span>Population: </span>
              {data.population}
            </p>
            <p>
              <span>Region: </span>
              {data.region}
            </p>
            <p>
              <span>Sub Region: </span>
              {data.subregion}
            </p>
            <p>
              <span>Capital: </span>
              {data.capital}
            </p>
            <p>
              <span>Top Level Domain: </span>
              {data.tld}
            </p>
            <p>
              <span>Currencies: </span>
              {renderCurrencies()}
            </p>
            <p>
              <span>Languages: </span>
              {renderLanguages()}
            </p>
            <h2>Border Countries: </h2>
            <ul>{renderBorders()}</ul>
          </main>
        </div>
      )}
    </>
  );
};

export default CountryPage;
