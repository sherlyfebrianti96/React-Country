import { CountryType } from "./Country";

export interface TableColumnType {
  field: keyof CountryType;
  headerName: string;
  sortable: boolean;
  align?: "right" | "inherit" | "left" | "center" | "justify";
  format?: (
    value:
      | string
      | number
      | boolean
      | Array<string>
      | Array<number>
      | {
          [key: string]:
            | string
            | number
            | boolean
            | Array<string>
            | Array<number>;
        }
      | Array<{
          [key: string]:
            | string
            | number
            | boolean
            | Array<string>
            | Array<number>;
        }>
  ) => void;
}
