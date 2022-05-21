import { NotFoundException } from "../exceptions/NotFoundException";
import { Router } from "express";
import { Controller } from "../interfaces/controller.interface";
import { StockService } from "./stock.service";
import { routerHandler } from "../utils/routerHandler";

export class StockController implements Controller {
	public path = "/stock";
	public router = Router();

	constructor(private stockService = new StockService()) {
		this.initializeRoutes();
	}

	private initializeRoutes() {
		this.router.get(`${this.path}/`, this.getStockByDate);
	}

	private getStockByDate = routerHandler<
		unknown,
		unknown,
		unknown,
		{ date?: string }
	>(async (req, res) => {
		const parsedDate = req.query.date ? new Date(req.query.date) : new Date();
		if (!isNaN(parsedDate.getTime())) {
			const stock = await this.stockService.getStocksFromDate(parsedDate);
			if (stock) {
				return res.json(stock);
			}
		}
		throw new NotFoundException();
	});
}
