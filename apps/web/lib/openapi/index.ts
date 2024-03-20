import { ZodOpenApiObject } from "zod-openapi";

import { LinkSchema } from "@/lib/zod/schemas/links";
import { ProjectSchema } from "@/lib/zod/schemas/projects";
import { TagSchema } from "@/lib/zod/schemas/tags";
import { API_DOMAIN } from "@dub/utils";
import { analyticsPaths } from "./analytics";
import { linksPaths } from "./links";
import { projectsPaths } from "./projects";
import { qrCodePaths } from "./qr";
import { tagsPaths } from "./tags";

export const openApiObject: ZodOpenApiObject = {
  openapi: "3.0.3",
  info: {
    title: "7QR API",
    description:
      "Dub is link management infrastructure for companies to create marketing campaigns, link sharing features, and referral programs.",
    version: "0.0.1",
    contact: {
      name: "7QR Support",
      email: "contact@7qr.codes",
      url: "https://7qr.codes/api",
    },
    license: {
      name: "AGPL-3.0 license",
      url: "https://github.com/7qrcodes/7QR/blob/main/LICENSE.md",
    },
  },
  servers: [
    {
      url: API_DOMAIN,
      description: "Production API",
    },
  ],
  paths: {
    ...linksPaths,
    ...qrCodePaths,
    ...analyticsPaths,
    ...projectsPaths,
    ...tagsPaths,
  },
  components: {
    schemas: {
      LinkSchema,
      ProjectSchema,
      TagSchema,
    },
    securitySchemes: {
      bearerToken: {
        type: "http",
        description: "Default authentication mechanism",
        scheme: "bearer",
      },
    },
  },
};
