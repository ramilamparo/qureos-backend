import { HackerrankStock } from "../../interfaces/hackerrank-stock.interface";
import nock from "nock";
import { StockDto } from "../stock.dto";
import { StockService } from "../stock.service";

describe("Stock Service", () => {
	describe("when getting stock response", () => {
		it("should return the correct response", async () => {
			const response: HackerrankStock = {
				page: 1,
				per_page: 500,
				total: 1,
				total_pages: 1,
				data: [
					{
						date: "5-January-2000",
						open: 5265.09,
						high: 5464.35,
						low: 5184.48,
						close: 5357,
					},
				],
			};
			nock("https://jsonmock.hackerrank.com")
				.get("/api/stocks?date=5-January-2000")
				.reply(304, response);

			const stockService = new StockService();
			const data: StockDto | null = await stockService.getStocksFromDate(
				new Date(2000, 0, 5),
			);
			if (data === null) {
				throw new Error("Data cannot be null");
			}

			expect(data).toBeInstanceOf(StockDto);
			expect(data.open).toEqual(response.data[0].open);
			expect(data.close).toEqual(response.data[0].close);
			expect(data.high).toEqual(response.data[0].high);
			expect(data.low).toEqual(response.data[0].low);
		});

		it("returns null when there is no result.", async () => {
			const response: HackerrankStock = {
				page: 1,
				per_page: 500,
				total: 1,
				total_pages: 1,
				data: [],
			};
			nock("https://jsonmock.hackerrank.com")
				.get("/api/stocks?date=5-January-2000")
				.reply(304, response);

			const stockService = new StockService();
			const data: StockDto | null = await stockService.getStocksFromDate(
				new Date(2000, 0, 5),
			);

			expect(data).toBe(null);
		});
	});
});
