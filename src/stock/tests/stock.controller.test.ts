import request from "supertest";
import { StockController } from "../../stock/stock.controller";
import { App } from "../../App";
import { StockService } from "../../stock/stock.service";

describe("Stock Controller", () => {
	describe("Get stock from date query", () => {
		it("Returns the correct response in a specified date", async () => {
			const stockService = new StockService();
			const controller = new StockController(stockService);
			const app = new App([controller]);
			const mock = {
				open: 5265.09,
				high: 5464.35,
				low: 5184.48,
				close: 5357,
			};

			stockService.getStocksFromDate = jest.fn().mockResolvedValueOnce(mock);
			const res = await request(app.getServer())
				.get(`${controller.path}?date=${new Date().toISOString()}`)
				.expect(200);
			expect(res.body.open).toEqual(mock.open);
			expect(res.body.close).toEqual(mock.close);
			expect(res.body.high).toEqual(mock.high);
			expect(res.body.low).toEqual(mock.low);
		});
	});
});
