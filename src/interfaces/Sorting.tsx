import { SortingDirection } from "../enum/SortingDirection";
import { CountryType } from "./Country";

export interface SortingType {
	by: keyof CountryType;
	direction: SortingDirection;
}