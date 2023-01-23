import { createRouter, OnDecodeErrorFn } from "@api-ts/typed-express-router";
import { apiSpec, httpRequest, httpRoute } from "@api-ts/io-ts-http";
import { clientRepresentation } from "../keycloak/clientRepresentation";
import * as t from "io-ts";
import * as handlers from "./handlers";

const onDecodeError: OnDecodeErrorFn = (errs, _req, res): void => {
  const values = errs.map((err) => err.value).join(",");
  res.status(400).json(`Invalid request parameters. Values: ${values}`).end();
};

const CreateClient = httpRoute({
  path: "/v1/client",
  method: "POST",
  request: httpRequest({ body: { clientRepresentation } }),
  response: {
    200: t.type({ id: t.string }),
    409: t.type({ error: t.string }),
    401: t.type({ error: t.string }),
    500: t.type({ error: t.string }),
  },
});

const UpdateClient = httpRoute({
  path: "/v1/client",
  method: "PUT",
  request: httpRequest({
    body: { clientRepresentation },
  }),
  response: {
    200: t.type({ status: t.string }),
    404: t.type({ error: t.string }),
    401: t.type({ error: t.string }),
    500: t.type({ error: t.string }),
  },
});

const DeleteClient = httpRoute({
  path: "/v1/client/:id",
  method: "DELETE",
  request: httpRequest({}),
  response: {
    200: t.type({ status: t.string }),
    404: t.type({ error: t.string }),
    401: t.type({ error: t.string }),
    500: t.type({ error: t.string }),
  },
});

export const KeyCloakApiSpec = apiSpec({
  "v1.client": {
    post: CreateClient,
    delete: DeleteClient,
    put: UpdateClient,
  },
});

const router = createRouter(KeyCloakApiSpec, { onDecodeError });

router.post("v1.client", [handlers.CreateClientHandler]);
router.delete("v1.client", [handlers.DeleteClientHandler]);
router.put("v1.client", [handlers.UpdateClientHandler]);

export default router;
