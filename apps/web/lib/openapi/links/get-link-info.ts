import { ZodOpenApiOperationObject } from "zod-openapi";

import { openApiErrorResponses } from "@/lib/openapi/responses";
import { getLinkInfoQuerySchema, LinkSchema } from "@/lib/zod/schemas/links";

export const getLinkInfo: ZodOpenApiOperationObject = {
  operationId: "getLinkInfo",
  summary: "Retrieve a link",
  description: "Retrieve the info for a link from their domain and key.",
  requestParams: {
    query: getLinkInfoQuerySchema,
  },
  responses: {
    "200": {
      description: "The retrieved link",
      content: {
        "application/json": {
          schema: LinkSchema,
        },
      },
    },
    ...openApiErrorResponses,
  },
  tags: ["Links"],
  security: [{ bearerToken: [] }],
};
