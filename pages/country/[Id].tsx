import { useRouter } from "next/router";
import { useEffect, useState, useContext, MouseEvent } from "react";
import axios from "axios";
import getBorders from "../api/getBorders";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CountryData } from "@/interfaces";
import { ThemeContext } from "@/context/themeContext";
import LightClasses from "./CountryIdLight.module.css";
import DarkClasses from "./CountryIdDark.module.css";

const CountryPage = () => {
  const { theme } = useContext(ThemeContext);
  let styles: { readonly [x: string]: string };
  theme === "light" ? (styles = LightClasses) : (styles = DarkClasses);
  const [data, setData] = useState<CountryData>();
  const [borders, setBorders] = useState<CountryData[]>();
  const router = useRouter();
  const query = router.query.Id;
  function insertCommas(num: number) {
    let numStr = num.toString().split("");
    for (var i = numStr.length - 3; i > 0; i -= 3) {
      numStr.splice(i, 0, ",");
    }
    return numStr.join("");
  }
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
    const { languages } = data || {};
    if (languages) {
      for (let [, value] of Object.entries(languages)) {
        string += `${value}${
          value === Object.values(languages).slice(-1)[0] ? "" : ", "
        }`;
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

  const redirectHandler = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (event.target instanceof HTMLButtonElement) {
      let route = event.target.value;
      router.push(`${route}`);
    }
  };

  const renderBorders = () => {
    return borders?.map((country) => {
      return (
        <li className={styles.borderItem} key={country.flags.png}>
          <button
            onClick={redirectHandler}
            value={country.cca2}
            className={styles.borderButton}
            role="button"
            type="button"
            aria-label={`View details for ${country.name.common}`}
          >
            {country.name.common}
          </button>
        </li>
      );
    });
  };

  return (
    <>
      <Navbar />
      {data && (
        <div className={styles.window}>
          <button
            onClick={redirectHandler}
            value="/"
            className={styles.backButton}
            tabIndex={0}
            title="Go back to previous page"
          >
            &larr; Back
          </button>

          <main className={styles.body}>
            <img
              className={styles.flag}
              src={data.flags.png}
              alt={`${data.name.common} flag`}
            />
            <div className={styles.content}>
              <h1 className={styles.header}>{data.name.common}</h1>
              <div className={styles.subContent}>
                {data.name.nativeName && (
                  <p>
                    <span className={styles.property}>
                      {Object.values(data?.name.nativeName).length > 1
                        ? "Native Names: "
                        : "Native Name: "}{" "}
                    </span>
                    {renderNativeNames()}
                    <span className="sr-only">
                      {Object.values(data?.name.nativeName).length > 1
                        ? " Native Names: "
                        : " Native Name: "}
                      {renderNativeNames()}
                    </span>
                  </p>
                )}

                <p aria-label={`Population of ${data.name.common}`}>
                  <span className={styles.property}>Population: </span>
                  {insertCommas(data.population)}
                </p>
                <p aria-label={`Region of ${data.name.common}`}>
                  <span className={styles.property}>Region: </span>
                  {data.region}
                </p>
                <p aria-label={`Subregion of ${data.name.common}`}>
                  <span className={styles.property}>Sub Region: </span>
                  {data.subregion}
                </p>
                <p aria-label={`Capital of ${data.name.common}`}>
                  <span className={styles.property}>Capital: </span>
                  {data.capital}
                </p>
                <p aria-label={`Top level domain of ${data.name.common}`}>
                  <span className={styles.property}>Top Level Domain: </span>
                  {data.tld}
                </p>
                <p aria-label={`Currencies of ${data.name.common}`}>
                  <span className={styles.property}>Currencies: </span>
                  {renderCurrencies()}
                </p>
                <p aria-label={`Languages of ${data.name.common}`}>
                  <span className={styles.property}>Languages: </span>
                  {renderLanguages()}
                </p>
              </div>
              <div
                aria-label={`Countries that border ${data.name.common}`}
                className={styles.borderDiv}
              >
                <h4 className={styles.borderHeader}>Border Countries: </h4>
                <ul className={styles.borderList}>{renderBorders()}</ul>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  );
};

export default CountryPage;
