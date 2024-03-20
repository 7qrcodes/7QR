import { withAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import z from "@/lib/zod";
import { DUB_DOMAINS_ARRAY } from "@dub/utils";
import { NextResponse } from "next/server";

// GET /api/domains/default - get default domains
export const GET = withAuth(async ({ project }) => {
  return NextResponse.json(["7qr.link", "7qr.sh"]);
});

const updateDefaultDomainsSchema = z.object({
  defaultDomains: z.array(z.enum(DUB_DOMAINS_ARRAY as [string, ...string[]])),
});

// PUT /api/domains/default - edit default domains
export const PUT = withAuth(async ({ req, project }) => {
  const { defaultDomains } = await updateDefaultDomainsSchema.parseAsync(
    await req.json(),
  );

  const response = await prisma.defaultDomains.update({
    where: {
      projectId: project.id,
    },
    data: {
      qrsh: defaultDomains.includes("7qr.sh"),
      qrlink: defaultDomains.includes("7qr.link"),
    },
  });

  return NextResponse.json(response);
});
