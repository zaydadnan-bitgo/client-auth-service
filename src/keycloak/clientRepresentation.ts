import * as t from "io-ts";

export const clientRepresentation = t.type({
  id: t.string,
  clientId: t.string,
  name: t.string,
  description: t.string,
  serviceAccountsEnabled: t.string,
  standardFlowEnabled: t.string,
  consentRequired: t.string,
  redirectUris: t.readonlyArray(t.string),
  webOrigins: t.readonlyArray(t.string),
});
