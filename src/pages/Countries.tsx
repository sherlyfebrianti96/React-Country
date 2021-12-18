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
        return population.toLocaleString(undefined, {
          minimumFractionDigits: 1,
          maximumFractionDigits: 1,
        });
      },
    },
  ];

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
              <TableRow
                key={country.alpha3Code}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
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
        </Table>
      </TableContainer>
    </MainLayout>
  );
};

export default CountriesPage;
