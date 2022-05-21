import * as https from "https";
import { plainToInstance } from "class-transformer";
import { HackerrankStock } from "../interfaces/hackerrank-stock.interface";
import { StockDto } from "./stock.dto";

export class StockService {
	public getStocksFromDate(date: Date): Promise<StockDto | null> {
		return new Promise<StockDto | null>((resolve, reject) => {
			const dateRequest = `${date.getDate()}-${date.toLocaleDateString(
				"en-us",
				{ month: "long" },
			)}-${date.getFullYear()}`;

			const req = https.get(
				{
					hostname: "jsonmock.hackerrank.com",
					path: `/api/stocks?date=${dateRequest}`,
				},
				(res) => {
					res.on("data", (data: Buffer) => {
						const stocks: HackerrankStock = JSON.parse(data.toString());
						const result = stocks.data[0];
						if (result) {
							resolve(plainToInstance(StockDto, result));
						} else {
							resolve(null);
						}
					});
				},
			);

			req.on("error", (error) => {
				reject(error);
			});

			req.end();
		});
	}
}
