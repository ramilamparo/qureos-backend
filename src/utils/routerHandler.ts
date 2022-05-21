import { RequestHandler, Request, Response, NextFunction } from "express";
import * as core from "express-serve-static-core";

export const routerHandler =
	<
		P = core.ParamsDictionary,
		ResBody = unknown,
		ReqBody = unknown,
		ReqQuery = core.Query,
		Locals extends Record<string, unknown> = Record<string, unknown>,
	>(
		handler: (
			req: Request<P, ResBody, ReqBody, ReqQuery, Locals>,
			res: Response<ResBody, Locals>,
			next: NextFunction,
		) => unknown,
	): RequestHandler<P, ResBody, ReqBody, ReqQuery, Locals> =>
	async (req, res, next) => {
		try {
			await handler(req, res, next);
		} catch (e) {
			next(e);
		}
	};
