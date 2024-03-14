import { openApiErrorResponses } from "@/lib/openapi/responses";
import z from "@/lib/zod";
import { getAnalyticsQuerySchema } from "@/lib/zod/schemas/analytics";
import { COUNTRY_CODES } from "@dub/utils";
import { ZodOpenApiOperationObject } from "zod-openapi";

export const getCountryAnalytics: ZodOpenApiOperationObject = {
  operationId: "getCountryAnalytics",
  summary: "Retrieve country analytics",
  description:
    "Retrieve the top countries by number of clicks for a link, a domain, or the authenticated project.",
  requestParams: {
    query: getAnalyticsQuerySchema,
  },
  responses: {
    "200": {
      description: "The top countries by number of clicks",
      content: {
        "application/json": {
          schema: z.array(
            z.object({
              country: z
                .enum(COUNTRY_CODES)
                .describe("The 2-letter country code: https://d.to/geo"),
              clicks: z
                .number()
                .describe("The number of clicks from this country"),
            }),
          ),
        },
      },
    },
    ...openApiErrorResponses,
  },
  tags: ["Analytics"],
  security: [{ bearerToken: [] }],
};
