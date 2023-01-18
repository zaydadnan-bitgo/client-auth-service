import type {
  WrappedRequest,
  WrappedResponse,
} from '@api-ts/typed-express-router';

export type ResultPayload<T extends WrappedResponse> = {
  data: Parameters<T['sendEncoded']>[1];
  status: Parameters<T['sendEncoded']>[0];
};

export const wrapHandler = async <
  T extends WrappedRequest,
  U extends WrappedResponse,
  V extends ResultPayload<U>
>(
  req: T,
  res: U,
  handler: () => Promise<V>
) => {
  try {
    const {status, data} = await handler();
    res.sendEncoded(status, data);
  } catch (error) {
    let status = 500;
    let errorMsg = 'Internal Server Error';
    res.sendEncoded(status, {error: errorMsg});
  } finally {
    res.end();
  }
};
