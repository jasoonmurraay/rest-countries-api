import Navbar from "@/components/Navbar";
import Country from "@/components/Country";
import LightClasses from "../styles/HomeLight.module.css";
import DarkClasses from "../styles/HomeDark.module.css";
import { useRef, useState, useEffect, useContext, MouseEvent } from "react";
import axios from "axios";
import Link from "next/link";
import { ThemeContext } from "@/context/themeContext";
import {
  CountryData,
  Currencies,
  Flags,
  Languages,
  Name,
  NativeName,
} from "@/interfaces";
import Head from "next/head";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  let styles: {
    readonly [x: string]: string;
  };
  theme === "light" ? (styles = LightClasses) : (styles = DarkClasses);
  const [countries, setCountries] = useState<CountryData[]>([]);
  const allCountries = async () => {
    function compare(a: CountryData, b: CountryData) {
      if (a.name.common < b.name.common) {
        return -1;
      } else if (a.name.common > b.name.common) {
        return 1;
      } else {
        return 0;
      }
    }
    await axios.get("https://restcountries.com/v3.1/all").then((data) => {
      const sortedCountries = data.data.sort(compare);
      setCountries(sortedCountries);
    });
  };
  useEffect(() => {
    allCountries();
  }, []);

  console.log("country data: ", countries);

  const [dropdownOpen, setDropdownOpen] = useState<Boolean>(false);
  const searchRef = useRef<any>();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const searchCountryHandler = async () => {
    if (searchRef.current) {
      const query = searchRef.current.value;
      if (query.length) {
        await axios
          .get(`https://restcountries.com/v3.1/name/${query}`)
          .then((data) => {
            setCountries(data.data);
          });
      } else {
        allCountries();
      }
    }
  };
  const filterCountryHandler = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.target instanceof Element) {
      let query = event.target.innerHTML;
      if (query !== "Whole World") {
        await axios
          .get(`https://restcountries.com/v3.1/region/${query}`)
          .then((data: any) => setCountries(data.data));
      } else {
        allCountries();
      }
      setDropdownOpen(false);
    }
  };
  const renderCountries = () => {
    if (countries) {
      return countries.map((country) => {
        const capital = country.capital;
        return (
          <li className={styles.countryCard} key={country.flags.png}>
            <a
              tabIndex={1}
              aria-label={`Data for and a link to the page for ${country.name.common}`}
              className={styles.link}
              href={`/country/${country.cca2}`}
            >
              <Country
                flags={country.flags}
                name={country.name}
                population={country.population}
                region={country.region}
                capital={capital}
                altSpellings={country.altSpellings}
                area={country.area}
                borders={country.borders}
                capitalInfo={country.capitalInfo}
                car={country.car}
                cca2={country.cca2}
                cca3={country.cca3}
                ccn3={country.ccn3}
                cioc={country.cioc}
                coatOfArms={country.coatOfArms}
                continents={country.continents}
                currencies={country.currencies}
                demonyms={country.demonyms}
                fifa={country.fifa}
                flag={country.flag}
                idd={country.idd}
                independent={country.independent}
                landlocked={country.landlocked}
                languages={country.languages}
                latlng={country.latlng}
                maps={country.maps}
                startOfWeek={country.startOfWeek}
                status={country.status}
                subregion={country.subregion}
                timezones={country.timezones}
                tld={country.tld}
                translations={country.translations}
                unMember={country.unMember}
              />
            </a>
          </li>
        );
      });
    }
  };
  return (
    <>
      <Navbar />
      <Head>
        <title aria-label="Page title: Countries Home Page">
          Countries Home Page
        </title>
      </Head>
      <main className={styles.mainBody}>
        <h1 aria-label="Search for a country!" className={styles.mainHeader}>
          Search For a Country!
        </h1>
        <div
          aria-label="Search for countries, or filter by region"
          className={styles.searchAndFilter}
        >
          <input
            ref={searchRef}
            placeholder="Search for a country..."
            className={styles.search}
            type="text"
            onChange={searchCountryHandler}
            aria-label="Country search bar"
          />
          <div className={styles.filter}>
            <button
              aria-haspopup
              aria-aria-labelledby="Select to filter countries by region"
              className={styles.dropdownBtn}
              onClick={toggleDropdown}
            >
              Filter by Region
            </button>
            {dropdownOpen && (
              <ul aria-expanded className={styles.filterList}>
                <li className={styles.filterItem}>
                  <button
                    aria-label="Filter by countries in the whole world"
                    tabIndex={0}
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Whole World
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
                    tabIndex={0}
                    aria-label="Filter by countries in Africa"
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Africa
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
                    tabIndex={0}
                    aria-label="Filter by countries in the Americas"
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Americas
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
                    tabIndex={0}
                    aria-label="Filter by countries in Asia"
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Asia
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
                    tabIndex={0}
                    aria-label="Filter by countries in Europe"
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Europe
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
                    tabIndex={0}
                    aria-label="Filter by countries in Oceania"
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Oceania
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
        <ul className={styles.countryList}>{renderCountries()}</ul>
      </main>
    </>
  );
}
