import express from "express";
import { PORT } from "./config/env";
import { Controller } from "./interfaces/controller.interface";
import { errorMiddleware } from "./middlewares/error.middleware";

export class App {
	private app: express.Express;

	constructor(private controllers: Controller[]) {
		this.app = express();

		this.initializeControllers();
		this.initialize404Handler();
		this.initializeErrorHandling();
	}

	private initializeControllers() {
		this.controllers.forEach((controller) => {
			this.app.use("/", controller.router);
		});
	}

	private initializeErrorHandling = () => {
		this.app.use(errorMiddleware);
	};

	private initialize404Handler = () => {
		return this.app.all("*", (req, res) => {
			res.status(404).send(this.printAvailableRoutes());
		});
	};

	private printAvailableRoutes = () => {
		// Haven't found a way to dynamically list all routes in the express app yet...
		return `
			<h1>Available Routes</h1>
			<ul>
				<li>GET /stock?date=2000/01/05</li>
			</ul>
			`;
	};

	public getServer() {
		return this.app;
	}

	public listen() {
		this.app.listen(PORT, () => {
			console.log(`App listening on the port ${PORT}`);
		});
	}
}
