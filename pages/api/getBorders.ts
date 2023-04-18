import axios from "axios";
import { CountryData } from "@/interfaces";

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
