import { getProjects } from "@/lib/fetchers";
import { redirect } from "next/navigation";

export default async function OldLinksStatsPage({
  params,
}: {
  params: {
    key: string;
  };
}) {
  const projects = await getProjects();
  if (!projects || projects.length === 0) {
    redirect("/");
  }
  redirect(`/${projects[0].slug}/analytics?domain=${process.env.NEXT_PUBLIC_APP_SHORT_DOMAIN}&key=${params.key}`);
}
