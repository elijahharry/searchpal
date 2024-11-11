import { notFound } from "next/navigation";

export default async function SandBox() {
  if (process.env.NODE_ENV === "development") {
    const { Client } = await import("./Client");
    return <Client />;
  }

  notFound();
}
