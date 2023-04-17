import LightClasses from "./CountryLight.module.css";
import DarkClasses from "./CountryDark.module.css";

interface Country {
  flags: {
    png: string;
    svg: string;
  };
  name: String;
  population: Number;
  region: String;
  capital: String;
  theme: String;
}

const Country = (props: Country) => {
  let styles;
  props.theme === "light" ? (styles = LightClasses) : (styles = DarkClasses);
  const data = props;
  return (
    <div className={styles.cardBody}>
      <img className={styles.flag} src={data.flags.png}></img>
      <div className={styles.cardContent}>
        <h1>{data.name}</h1>
        <p>{`Population: ${data.population}`}</p>
        <p>{`Region: ${data.region}`}</p>
        {data.capital && <p>{`Capital: ${data.capital}`}</p>}
      </div>
    </div>
  );
};

export default Country;
