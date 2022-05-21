/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { HttpException } from "../exceptions/HttpException";
import { UnknownException } from "../exceptions/UnknownException";

export const errorMiddleware: ErrorRequestHandler = (
	error: HttpException | Error,
	request,
	response,
	next,
) => {
	const errorInstance =
		error instanceof HttpException ? error : new UnknownException(error);

	const status = errorInstance.getStatusCode();
	const message = errorInstance.getMessage();

	response.status(status).send({
		message,
		status,
	});
};
