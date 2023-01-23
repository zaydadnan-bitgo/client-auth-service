import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import dotenv from "dotenv";

dotenv.config();

export const Config = t.type({
  port: t.string,
  clientId: t.string,
  clientSecret: t.string,
  realm: t.string,
  keycloakBaseUrl: t.string,
});

export type Config = t.TypeOf<typeof Config>;

export function loadConfig(env: Record<string, unknown>): Config {
  const configEither: E.Either<t.Errors, Config> = Config.decode({
    port: env.PORT,
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    realm: env.REALM,
    keycloakBaseUrl: env.KEYCLOAK_BASE_URL,
  });
  if (E.isLeft(configEither)) {
    throw new Error(`failed to load config`);
  }
  return configEither.right;
}

export const configs: Config = loadConfig(process.env ?? {});
