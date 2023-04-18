import LightClasses from "./CountryLight.module.css";
import DarkClasses from "./CountryDark.module.css";
import { CountryData } from "@/interfaces";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContext";

const Country = (props: CountryData) => {
  const { theme } = useContext(ThemeContext);
  let styles;
  theme === "light" ? (styles = LightClasses) : (styles = DarkClasses);
  const data = props;
  return (
    <div className={styles.cardBody}>
      <img className={styles.flag} src={data.flags.png}></img>
      <div className={styles.cardContent}>
        <h1>{data.name.common}</h1>
        <p>{`Population: ${data.population}`}</p>
        <p>{`Region: ${data.region}`}</p>
        {data.capital && <p>{`Capital: ${data.capital}`}</p>}
      </div>
    </div>
  );
};

export default Country;
