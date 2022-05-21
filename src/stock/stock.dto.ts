import { IsNumber } from "class-validator";
export class StockDto {
	@IsNumber()
	open: number;

	@IsNumber()
	high: number;

	@IsNumber()
	low: number;

	@IsNumber()
	close: number;
}
