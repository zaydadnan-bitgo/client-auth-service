export type ErrorClass = new (...args: any[]) => Error;

export abstract class HttpError extends Error {
  public readonly statusCode: number;
  constructor(msg: string, statusCode: number) {
    super(msg);
    this.statusCode = statusCode;
  }
}
export class DecodingError extends HttpError {
  constructor(msg: string) {
    super(msg, 500);
    this.name = "DecodingError";
    try {
      this.message = this.parseErrorMessage(msg);
    } catch (error) {
      let msgPrefix = "";
      if (error instanceof Error) {
        msgPrefix = `Failed to parse decoding error: ${error.message}`;
      } else {
        msgPrefix = `Unknown decoding parsing error: ${JSON.stringify(error)}`;
      }
      this.message = msgPrefix + " - Decoding error msg: " + msg;
    }
  }

  /**
   * Parses the decoding erorr message from the io-ts-http 'decode' function
   * and returns a readable format
   * @param msg Decoding error message
   * @returns string
   */
  private parseErrorMessage(msg: string) {
    // Captures "Invalid value <value> supplied to:"
    let parsedMessage = msg.split(":")[0].trim() + ": ";

    // Captures '/<property name>:'
    const propertyPathRegex = /(?<=\/).*?(?=:)/g;
    const arr = msg.match(propertyPathRegex);

    if (arr) {
      arr.forEach((val, index) => {
        if (val === "0" && index !== 0) {
          parsedMessage += "/";
        } else if (val !== "0") {
          parsedMessage += val;
        }
      });
    } else {
      throw new Error("No decoding regex matches found");
    }
    return parsedMessage;
  }
}

export class InvalidWalletAddressError extends Error {
  constructor(address: string) {
    super("Invalid wallet address provided: " + address);
    this.name = "InvalidAddressError";
  }
}

export class InvalidContractAddressError extends Error {
  constructor(address: string) {
    super("Invalid contract address provided: " + address);
    this.name = "InvalidAddressError";
  }
}

export class InvalidContractABIError extends Error {
  constructor(contractAddress: string, data: string) {
    super(
      `Contract address: ${contractAddress} encountered an error decoding data ${data}`
    );
    this.name = "InvalidContractMethodError";
  }
}

export class ProxyNotFoundError extends Error {
  constructor(proxyAddress: string) {
    super(`Implementation for proxy contract ${proxyAddress} not found`);
    this.name = "ProxyNotFoundError";
  }
}

export class RPCError extends Error {
  constructor(data: string) {
    super(`Error attempting to RPC node with data: ${data}`);
    this.name = "RPCError";
  }
}

export class InvalidChainError extends Error {
  constructor(chain: string) {
    super("Unsupported chain for request: " + chain);
    this.name = "InvalidChainError";
  }
}

export class InvalidSymbolError extends Error {
  constructor(symbol: string) {
    super("Unsupported symbol for query: " + symbol);
    this.name = "InvalidSymbolError";
  }
}

export class InvalidSimulationRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "InvalidSimulationRequestError";
  }
}

export class UnknownInternalError extends Error {
  constructor(msg: string) {
    super("Unknown internal error: " + msg);
    this.name = "UnknownInternalError";
  }
}

export class NeevaAuthorizationError extends Error {
  constructor(msg: string) {
    super("Neeva request unauthorized" + msg);
    this.name = "NeevaAuthorizationError";
  }
}

export class NeevaGatewayError extends Error {
  constructor(msg: string) {
    super("Bad gateway: " + msg);
    this.name = "GatewayError";
  }
}

export class RateLimitError extends Error {
  constructor(provider: string) {
    super("Reached rate limit of: " + provider);
    this.name = "RateLimitError";
  }
}

export class InvalidRequestError extends Error {
  constructor(msg: string) {
    super("Invalid request: " + msg);
    this.name = "InvalidRequestError";
  }
}

export class NotFoundError extends HttpError {
  constructor(msg: string) {
    super(msg, 404);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends HttpError {
  constructor(msg: string) {
    super(msg, 409);
    this.name = "InternalServerError";
  }
}

export class BadRequestError extends HttpError {
  constructor(msg: string) {
    super(msg, 400);
    this.name = "BadRequestError";
  }
}

export class InternalServerError extends HttpError {
  constructor(msg: string) {
    super(msg, 500);
    this.name = "InternalServerError";
  }
}

export class ExternalProviderError extends HttpError {
  constructor(msg: string) {
    super(msg, 555);
    this.name = "ExternalProviderError";
  }
}
