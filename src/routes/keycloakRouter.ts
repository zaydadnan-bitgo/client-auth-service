import type { TypedRequestHandler } from "@api-ts/typed-express-router";
import { createRouter } from "@api-ts/typed-express-router";

import { apiSpec, httpRequest, httpRoute } from "@api-ts/io-ts-http";
import * as t from "io-ts";
import { wrapHandler } from "../middleware";

//request to create client
const CreateClient = httpRoute({
  path: '/v1/realm/create',
  method: 'POST',
  request: httpRequest({}),
  response: {
    200: t.type({
      id: t.string,
    }),
    500: t.type({
      error: t.string,
    }),
  },
});

//request to delete client
const DeleteClient = httpRoute({
    path: '/v1/realm/delete',
    method: 'DELETE',
    request: httpRequest({}),
    response: {
      200: t.type({
        status: t.string,
      }),
    },
  });

//request to update client information
const UpdateClient = httpRoute({
    path: '/v1/realm/update',
    method: 'PUT',
    request: httpRequest({}),
    response: {
        200: t.type({
          id: t.string,
        }),
        500: t.type({
          error: t.string,
        }),
      },
  });
  
//request to get all clients for realm
const GetClients = httpRoute({
  path: '/v1/realm/clients',
  method: 'GET',
  request: httpRequest({}),
  response: {
    200: t.type({
      status: t.string,
    }),
  },
});

export const KeyCloakApiSpec = apiSpec({
  'v1.realm.clients': {
    get: GetClients,
  },
  'v1.realm.create': {
    post: CreateClient,
  },
  'v1.realm.delete': {
    delete: DeleteClient,
  },
  'v1.realm.update': {
    put: UpdateClient,
  },
});

type KeyCloakApiSpec = typeof KeyCloakApiSpec;

const CreateClientHandler: TypedRequestHandler<
  KeyCloakApiSpec,
  'v1.realm.create',
  'post'
> = async (req, res) => {
  wrapHandler(req, res, async () => {
        //TO DO:add logic here calling keycloak 
    try {
      return { status: 200, data: { id: "new client id here" } };
    } catch (error) {
      res.locals.logger.error("Failed  to create new client", { error });
      throw new Error("Failed to create new client");
    }
  });
};

const UpdateClientHandler: TypedRequestHandler<
  KeyCloakApiSpec,
  'v1.realm.update',
  'put'
> = async (req, res) => {
  wrapHandler(req, res, async () => {
    //TO DO:add logic here calling keycloak 
    try {
      return { status: 200, data: { id: "updated client here" } };
    } catch (error) {
      res.locals.logger.error("Failed to record user agreement", { error });
      throw new Error("Failed to record user agreement");
    }
  });
};

const GetClientsHandler: TypedRequestHandler<
  KeyCloakApiSpec,
  'v1.realm.clients',
  'get'
> = async (_req, res) => {
        //TO DO:add logic here calling keycloak 
  res.sendEncoded(200, { status: "Getting all clients" });
};

const DeleteClientHandler: TypedRequestHandler<
  KeyCloakApiSpec,
  'v1.realm.delete',
  'delete'
> = async (_req, res) => {
        //TO DO:add logic here calling keycloak 
  res.sendEncoded(200, { status: "Deleting client with id" });
};

const router = createRouter(KeyCloakApiSpec);

router.post('v1.realm.create', [CreateClientHandler]);
router.delete('v1.realm.delete', [DeleteClientHandler]);
router.put('v1.realm.update', [UpdateClientHandler]);
router.get('v1.realm.clients', [GetClientsHandler]);

export default router;


