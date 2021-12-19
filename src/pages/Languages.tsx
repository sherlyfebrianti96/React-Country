import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useCountries } from "../hooks/useCountries";
import { CountryType } from "../interfaces/Country";
import { LanguageType } from "../interfaces/Language";
import { TableColumnType } from "../interfaces/TableColumn";
import MainLayout from "../layout/MainLayout";

export interface LanguagesPageProps {}

export const LanguagesPage: React.FunctionComponent<LanguagesPageProps> = ({
  ...props
}) => {
  const { data: countryList }: { data: Array<CountryType> } = useCountries();

  const languages: {
    [key: string]: LanguageType;
  } = {};

  /* Reformat the Data */
  countryList?.map((country) =>
    country.languages.forEach((lang) => {
      if (languages[lang.iso639_2]) {
        languages[lang.iso639_2].countries.push(country.name);
        languages[lang.iso639_2].population += country.population;
      } else {
        languages[lang.iso639_2] = {
          iso639_1: lang.iso639_1,
          iso639_2: lang.iso639_2,
          name: lang.name,
          nativeName: lang.nativeName,
          countries: [country.name],
          population: country.population,
        };
      }
    })
  );

  const columns: Array<TableColumnType> = [
    {
      field: "name",
      headerName: "Language",
    },
    {
      field: "countries",
      headerName: "Countries",
      format: (value) => {
        return (value as Array<string>)?.join(", ");
      },
    },
    {
      field: "population",
      headerName: "population",
      align: "right",
      format: (value) => {
        return value.toLocaleString();
      },
    },
  ];

  return (
    <MainLayout>
      <h1>Languages</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow key="countriesHeader">
              {columns.map((column) => (
                <TableCell key={column.field} /*align={column.align}*/>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.values(languages || []).map((language: LanguageType) => (
              <TableRow key={language.iso639_2}>
                {columns.map((column) => (
                  <TableCell
                    key={`${language.iso639_2}-${column.field}`}
                    align={column.align}
                  >
                    {(column.format &&
                      column.format(
                        language[column.field as keyof LanguageType]
                      )) ??
                      language[column.field as keyof LanguageType] ??
                      "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default LanguagesPage;
