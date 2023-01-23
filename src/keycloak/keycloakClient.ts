import KcAdminClient from "@keycloak/keycloak-admin-client";
import { configs } from "../config/config";

export const createClient = async () => {
  const kcAdminClient = new KcAdminClient({
    baseUrl: configs.keycloakBaseUrl,
    realmName: configs.realm,
  });

  await kcAdminClient.auth({
    grantType: "client_credentials",
    clientId: configs.clientId,
    clientSecret: configs.clientSecret,
  });

  return kcAdminClient;
};
