import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
	constructor(public message: string = "Entity not found") {
		super(message);
	}

	public getMessage(): string {
		return this.message;
	}

	public getStatusCode(): number {
		return 404;
	}
}
