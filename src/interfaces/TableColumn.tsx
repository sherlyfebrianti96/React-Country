import { CountryType } from "./Country";
import { LanguageType } from "./Language";

export interface TableColumnType {
  field: keyof CountryType | keyof LanguageType;
  headerName: string;
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
