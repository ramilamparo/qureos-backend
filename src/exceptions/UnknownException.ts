import { HttpException } from "./HttpException";

export class UnknownException extends HttpException {
	/** Might wanna log the passed error. */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	constructor(e: Error) {
		console.error(e);
		super();
	}

	public getMessage(): string {
		return "Something went wrong.";
	}
	public getStatusCode(): number {
		return 500;
	}
}
