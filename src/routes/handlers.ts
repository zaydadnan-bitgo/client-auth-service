import type { TypedRequestHandler } from "@api-ts/typed-express-router";
import { KeyCloakApiSpec } from "./router";
import { wrapHandler } from "../middleware";
import { extractReqParam, getBoolean } from "../utils";
import { createClient } from "../keycloak/keycloakClient";
import { NotFoundError, ConflictError } from "../errors";

type KeyCloakApiSpec = typeof KeyCloakApiSpec;

export const CreateClientHandler: TypedRequestHandler<
  KeyCloakApiSpec,
  "v1.client",
  "post"
> = async (req, res) => {
  wrapHandler(req, res, async () => {
    try {
      const request = req.body.clientRepresentation;
      const kcAdmin = await createClient();
      const newClient = await kcAdmin.clients.create({
        clientId: request.clientId,
        name: request.name,
        description: request.description,
        standardFlowEnabled: getBoolean(request.standardFlowEnabled),
        serviceAccountsEnabled: getBoolean(request.serviceAccountsEnabled),
        consentRequired: getBoolean(request.consentRequired),
        redirectUris: request.redirectUris,
        webOrigins: request.redirectUris,
      });
      return { status: 200, data: { id: newClient.id } };
    } catch (error) {
      console.log("in error section with error " + error);
      res.locals.logger.error("Failed to create new client", { error });
      throw new ConflictError("Failed to create new client");
    }
  });
};

export const UpdateClientHandler: TypedRequestHandler<
  KeyCloakApiSpec,
  "v1.client",
  "put"
> = async (req, res) => {
  wrapHandler(req, res, async () => {
    try {
      const request = req.body.clientRepresentation;
      const kcAdmin = await createClient();
      await kcAdmin.clients.update(
        { id: request.id },
        {
          clientId: request.clientId,
          name: request.name,
          description: request.description,
          standardFlowEnabled: getBoolean(request.standardFlowEnabled),
          serviceAccountsEnabled: getBoolean(request.serviceAccountsEnabled),
          consentRequired: getBoolean(request.consentRequired),
          redirectUris: request.redirectUris,
          webOrigins: request.redirectUris,
        }
      );
      return { status: 200, data: { status: "Successfully updated client" } };
    } catch (error) {
      console.log("update error " + error);
      res.locals.logger.error("Failed to update client", { error });
      throw new NotFoundError("Failed to update client");
    }
  });
};

export const DeleteClientHandler: TypedRequestHandler<
  KeyCloakApiSpec,
  "v1.client",
  "delete"
> = async (_req, res) => {
  try {
    const kcAdmin = await createClient();
    const ID: string = extractReqParam(_req, "id");
    await kcAdmin.clients.del({ id: ID });
    res.sendEncoded(200, { status: "Deleted client with id: " + ID });
  } catch (error) {
    res.sendEncoded(404, { error: "" + error });
  }
};
