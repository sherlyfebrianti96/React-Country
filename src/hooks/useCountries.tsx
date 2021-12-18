import { useQuery } from "react-query";
import { CountryType } from "../interfaces/Country";
// import { CountryType } from "../interfaces/Country";

export const useCountries = () => {
  const allCountriesURL = "https://restcountries.com/v2/all";

  const { data } = useQuery(["countries"], async () => {
		const res = await fetch(allCountriesURL);
		return res.json();
	});

  console.log("data : ", data);
	return data as Array<CountryType>;
};
