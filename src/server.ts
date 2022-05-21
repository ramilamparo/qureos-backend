import { App } from "./App";
import { StockController } from "./stock/stock.controller";

const app = new App([new StockController()]);

app.listen();
