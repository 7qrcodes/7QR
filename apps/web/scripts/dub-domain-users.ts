import prisma from "@/lib/prisma";
import "dotenv-flow/config";

async function main() {
  const users = await prisma.link.groupBy({
    by: ["userId"],
    where: {
      domain: process.env.NEXT_PUBLIC_APP_SHORT_DOMAIN as string,
    },
    _count: {
      userId: true,
    },
    orderBy: {
      _count: {
        userId: "desc",
      },
    },
    take: 100,
  });
  console.table(users);
}

main();
