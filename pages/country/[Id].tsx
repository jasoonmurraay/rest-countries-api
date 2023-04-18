import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
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
      return (
        <li className={styles.borderItem} key={country.flags.png}>
          <Link href={`/country/${country.cca2}`}>
            <button className={styles.borderButton}>
              {country.name.common}
            </button>
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      <Navbar />
      {data && (
        <div className={styles.window}>
          <Link href="/">
            <button className={styles.backButton}>&larr; Back</button>
          </Link>
          <main className={styles.body}>
            <img className={styles.flag} src={data.flags.png} />
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
                  </p>
                )}

                <p>
                  <span className={styles.property}>Population: </span>
                  {insertCommas(data.population)}
                </p>
                <p>
                  <span className={styles.property}>Region: </span>
                  {data.region}
                </p>
                <p>
                  <span className={styles.property}>Sub Region: </span>
                  {data.subregion}
                </p>
                <p>
                  <span className={styles.property}>Capital: </span>
                  {data.capital}
                </p>
                <p>
                  <span className={styles.property}>Top Level Domain: </span>
                  {data.tld}
                </p>
                <p>
                  <span className={styles.property}>Currencies: </span>
                  {renderCurrencies()}
                </p>
                <p>
                  <span className={styles.property}>Languages: </span>
                  {renderLanguages()}
                </p>
              </div>
              <div className={styles.borderDiv}>
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
