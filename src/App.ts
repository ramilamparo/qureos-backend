import { PORT } from "config/env";
import express, { Express } from "express";
import { Controller } from "interfaces/controller.interface";

export class App {
	public app: Express;

	constructor(controllers: Controller[]) {
		this.app = express();

		this.initializeControllers(controllers);
	}

	private initializeControllers(controllers: Controller[]) {
		controllers.forEach((controller) => {
			this.app.use("/", controller.router);
		});
	}

	public listen() {
		this.app.listen(PORT, () => {
			console.log(`App listening on the port ${process.env.PORT}`);
		});
	}
}
