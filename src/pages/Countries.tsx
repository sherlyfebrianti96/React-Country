import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useCountries } from "../hooks/useCountries";
import { CountryType } from "../interfaces/Country";
import { TableColumnType } from "../interfaces/TableColumn";
import MainLayout from "../layout/MainLayout";

export interface CountriesPageProps {}

export const CountriesPage: React.FunctionComponent<CountriesPageProps> = ({
  ...props
}) => {
  const countryList: Array<CountryType> = useCountries();

  const columns: Array<TableColumnType> = [
    {
      field: "name",
      headerName: "Name",
      sortable: true,
    },
    {
      field: "region",
      headerName: "Region",
      sortable: true,
    },
    {
      field: "area",
      headerName: "Area",
      sortable: true,
      align: "right",
      format: (value) => {
        const fixedArea = parseInt(value as string);
        return `${fixedArea.toLocaleString()} ㎥`;
      },
    },
    {
      field: "population",
      headerName: "Population",
      sortable: true,
      align: "right",
      format: (value) => {
        const population = parseFloat(value as string);
        return oneDecimalFormat(population);
      },
    },
  ];

  const oneDecimalFormat = (value: number) => {
    return value.toLocaleString(undefined, {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  };

  const populationAverageReducer = (
    accumultator: number,
    current: CountryType
  ) => accumultator + current.population;
  const populationAverage =
    (countryList &&
      oneDecimalFormat(
        countryList.reduce(populationAverageReducer, 0) / countryList.length
      )) ??
    "-";

  const countriesArea: Array<number> =
    countryList?.map((country) => country.area || 0) || [];
  const smallestArea = Math.min(0, ...countriesArea).toLocaleString();
  const biggestArea = Math.max(0, ...countriesArea).toLocaleString();

  return (
    <MainLayout>
      <h1>Countries</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow key="countriesHeader">
              {columns.map((column) => (
                <TableCell key={column.field} align={column.align}>
                  {column.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {countryList?.map((country) => (
              <TableRow key={country.alpha3Code}>
                {columns.map((column) => (
                  <TableCell
                    key={`${country.alpha3Code}-${column.field}`}
                    align={column.align}
                  >
                    {(column.format && column.format(country[column.field])) ??
                      country[column.field] ??
                      "-"}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell rowSpan={columns.length}>
                <Grid container direction="column">
                  <Grid item>
                    <Typography variant="subtitle2">
                      Population average from all the countries :&nbsp;
                      {populationAverage}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      Countries with smallest area :&nbsp;
                      {smallestArea}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2">
                      Countries with biggest area :&nbsp;
                      {biggestArea}
                    </Typography>
                  </Grid>
                </Grid>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default CountriesPage;
