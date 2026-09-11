import { notFound } from "next/navigation";
import { getNameBySlug } from "../../tokens";
import WatchlistButton from "../../WatchlistButton";

type ProtocolDetail = {
  name: string;
  description?: string;
  tags?: string[];
  currentChainTvls?: Record<string, number>;
};

async function getTokenDetail(slug: string): Promise<ProtocolDetail | null> {

  const res = await fetch(`https://api.llama.fi/protocol/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;

  return res.json();
}

function formatTvl(tvl: number): string {
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(2)}M`;
  return `$${tvl.toLocaleString()}`;
}

export default async function TokenDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = getNameBySlug(slug);

  if (!name) {
    notFound();
  }

  const detail = await getTokenDetail(slug);

  if (!detail) {
    notFound();
  }

  const chainEntries = Object.entries(detail.currentChainTvls ?? {});
  const totalTvl = chainEntries.reduce((sum, [, value]) => sum + value, 0);

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <div className="max-w-3xl mx-auto px-6 py-10">
        <a href="/" className="text-sm text-blue-400 hover:underline">
          ← Back to dashboard
        </a>

        <div className="flex items-start justify-between mt-4">
          <h1 className="text-2xl font-semibold">{detail.name}</h1>
          <WatchlistButton tokenName={detail.name} />
        </div>

        {detail.description && (
          <p className="text-white/60 mt-2 max-w-xl">{detail.description}</p>
        )}

        <div className="mt-6">
          <p className="text-4xl font-semibold">{formatTvl(totalTvl)}</p>
          <p className="text-xs text-white/50 mt-1">Total TVL</p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {(detail.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border border-blue-500/40 text-blue-400"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="text-sm font-medium text-white/70 mt-10 mb-3">
          Chain Distribution
        </h2>
        <div className="flex flex-col gap-2">
          {chainEntries
            .sort((a, b) => b[1] - a[1])
            .map(([chain, tvl]) => (
              <div
                key={chain}
                className="flex items-center justify-between bg-[#151922] border border-white/10 rounded-lg px-4 py-3"
              >
                <span className="text-sm">{chain}</span>
                <span className="text-sm text-white/70">
                  {formatTvl(tvl)}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}