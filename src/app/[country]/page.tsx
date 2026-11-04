import { notFound } from "next/navigation";
import { isCountry } from "@/data/markets";
import { MarketExperience } from "@/features/catalog/market-experience";
export function generateStaticParams() {
  return [{ country: "pe" }, { country: "cl" }];
}
export default async function MarketHome({
  params,
}: {
  params: Promise<{ country: string }>;
}) {
  const { country } = await params;
  if (!isCountry(country)) notFound();
  return <MarketExperience country={country} />;
}
