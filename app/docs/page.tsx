import { redirect } from "next/navigation";
import { defaultDocSlug } from "@/lib/docs";

export default function DocsIndex() {
  const first = defaultDocSlug();
  if (!first) redirect("/");
  redirect(`/docs/${first}`);
}
