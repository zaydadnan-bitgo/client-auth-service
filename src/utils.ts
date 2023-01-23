import { Request } from "express";

import { BadRequestError } from "./errors";

/**
 * Helper function to extract the wallet address, walletId, etc from the route params of a request.
 * @param req
 * @param param
 */
export function extractReqParam(req: Request, param: string): string {
  if (!(param in req.params)) {
    throw new BadRequestError(`Missing param: ${param}`);
  }
  return req.params[param];
}

/**
 * Converts a string parameter to a boolean for http requests, true if param == "true", else false
 * @param param
 * @returns
 */
export function getBoolean(param: String): boolean {
  return param == "true" ? true : false;
}
