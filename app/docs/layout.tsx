import { DocsHeader } from "@/components/docs/DocsHeader";
import { Footer } from "@/components/Footer";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DocsHeader />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
