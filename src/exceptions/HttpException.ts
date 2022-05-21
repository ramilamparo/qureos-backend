export abstract class HttpException extends Error {
	public abstract getMessage(): string;
	public abstract getStatusCode(): number;
}
