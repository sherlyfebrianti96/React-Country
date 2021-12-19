import {
  Grid,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SortingDirection } from "../enum/SortingDirection";
import { useCountries } from "../hooks/useCountries";
import { CountryType } from "../interfaces/Country";
import { SortingType } from "../interfaces/Sorting";
import { TableColumnType } from "../interfaces/TableColumn";
import MainLayout from "../layout/MainLayout";

export interface CountriesPageProps {}

export const CountriesPage: React.FunctionComponent<CountriesPageProps> = ({
  ...props
}) => {
  const [sorting, setSorting] = useState<SortingType>({
    by: "name",
    direction: SortingDirection.ASC,
  });

  const {
    data: countryList,
    isLoading: isLoadingCountries,
  }: { data: Array<CountryType>; isLoading: boolean } = useCountries();

  const onSortColumn = (evt: React.MouseEvent<HTMLDivElement>) => {
    const newSorting: SortingType = { ...sorting };

    const column = evt.currentTarget.getAttribute("data-column");

    if (column === sorting?.by) {
      /* Change the Sorting Direction */
      newSorting.direction = switchSorting(sorting.direction);
    } else {
      /* Change the Sorting Column */
      newSorting.by = column as keyof CountryType;
      newSorting.direction = SortingDirection.ASC;
    }

    setSorting(newSorting);
  };

  const switchSorting = (direction: SortingDirection) => {
    if (direction === SortingDirection.ASC) {
      return SortingDirection.DESC;
    }

    return SortingDirection.ASC;
  };

  const columns: Array<TableColumnType> = [
    {
      field: "name",
      headerName: "Name",
    },
    {
      field: "region",
      headerName: "Region",
    },
    {
      field: "area",
      headerName: "Area",
      align: "right",
      format: (value) => {
        const fixedArea = parseInt(value as string);
        return `${fixedArea.toLocaleString()} ㎥`;
      },
    },
    {
      field: "population",
      headerName: "Population",
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

  const sortData = (countryList: Array<CountryType>) => {
    const comparator = (a: CountryType, b: CountryType) => {
      if (sorting.direction === SortingDirection.ASC) {
        return comparatorByType(a, b, sorting.by);
      } else {
        return comparatorByType(b, a, sorting.by);
      }
    };

    return countryList?.sort(comparator);
  };

  const comparatorByType = (
    data1: CountryType,
    data2: CountryType,
    column: keyof CountryType
  ) => {
    switch (typeof data1[column]) {
      case "string":
        return data1[column].toString().localeCompare(data2[column].toString());

      default:
        return (data1[column] as number) - (data2[column] as number);
    }
  };

  return (
    <MainLayout>
      <h1>Countries</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow key="countriesHeader">
              {columns.map((column) => (
                <TableCell key={column.field} align={column.align}>
                  <TableSortLabel
                    data-column={column.field}
                    active={sorting?.by === column.field}
                    direction={sorting?.direction || SortingDirection.ASC}
                    onClick={onSortColumn}
                  >
                    <Typography>
                      <strong>{column.headerName}</strong>
                    </Typography>
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoadingCountries ? (
              <TableRow key="skeleton-row">
                {columns.map((column) => (
                  <TableCell key={`skeleton-row-${column.field}`}>
                    <Skeleton variant="rectangular" />
                  </TableCell>
                ))}
              </TableRow>
            ) : (
              sortData(countryList)?.map((country) => (
                <TableRow key={country.alpha3Code}>
                  {columns.map((column) => (
                    <TableCell
                      key={`${country.alpha3Code}-${column.field}`}
                      align={column.align}
                    >
                      {(column.format &&
                        column.format(
                          country[column.field as keyof CountryType]
                        )) ??
                        country[column.field as keyof CountryType] ??
                        "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={columns.length}>
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
