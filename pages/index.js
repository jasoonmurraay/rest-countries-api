import Navbar from "@/components/Navbar";
import Country from "@/components/Country";
import LightClasses from "../styles/HomeLight.module.css";
import DarkClasses from "../styles/HomeDark.module.css";
import { useRef, useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { ThemeContext } from "@/context/themeContext";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  let styles;
  theme === "light" ? (styles = LightClasses) : (styles = DarkClasses);
  const [countries, setCountries] = useState([]);
  const allCountries = async () => {
    function compare(a, b) {
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

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const searchRef = useRef();

  console.log("Countries state: ", countries);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const searchCountryHandler = async () => {
    if (searchRef.current.value.length) {
      const query = searchRef.current.value;
      await axios
        .get(`https://restcountries.com/v3.1/name/${query}`)
        .then((data) => {
          setCountries(data.data);
        })
        .catch(setCountries([]));
    } else {
      allCountries();
    }
  };
  const filterCountryHandler = async (event) => {
    event.preventDefault();
    let query = event.target.innerHTML;
    if (query !== "Whole World") {
      await axios
        .get(`https://restcountries.com/v3.1/region/${query}`)
        .then((data) => setCountries(data.data), setDropdownOpen(false))
        .catch(setCountries([]));
    } else {
      allCountries().then(setDropdownOpen(false));
    }
  };
  const renderCountries = () => {
    if (countries.length) {
      return countries.map((country) => {
        return (
          <li className={styles.countryCard} key={country.idd}>
            <Link href={`/country/${country.cioc}`}>
              <Country
                flags={country.flags}
                name={country.name.common}
                population={country.population}
                region={country.region}
                capital={country.capital}
                theme={theme}
              />
            </Link>
          </li>
        );
      });
    }
  };
  return (
    <>
      <Navbar />
      <main className={styles.mainBody}>
        <div className={styles.searchAndFilter}>
          <input
            ref={searchRef}
            placeholder="Search for a country..."
            className={styles.search}
            type="text"
            onChange={searchCountryHandler}
          />
          <div className={styles.filter}>
            <button className={styles.dropdownBtn} onClick={toggleDropdown}>
              Filter by Region
            </button>
            {dropdownOpen && (
              <ul className={styles.filterList}>
                <li className={styles.filterItem}>
                  <button
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Whole World
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Africa
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Americas
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Asia
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
                    className={styles.filterSelector}
                    onClick={filterCountryHandler}
                  >
                    Europe
                  </button>
                </li>
                <li className={styles.filterItem}>
                  <button
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
