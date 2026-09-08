import WatchlistButton from "./WatchlistButton";

const TOKEN_NAMES = [
  "BlackRock BUIDL",
  "Ondo Yield Assets",
  "Circle USYC",
  "Centrifuge Protocol",
  "RealT Tokens",
  "Tether Gold",
  "WisdomTree",
  "Hastra",
];

type Protocol = {
  name: string;
  tvl: number;
  tags?: string[];
  chains?: string[];
};

async function getRwaTokens(): Promise<Protocol[]> {
  const res = await fetch("https://api.llama.fi/protocols", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch protocols: ${res.status}`);
  }

  const data: Protocol[] = await res.json();

  return data.filter((protocol) => TOKEN_NAMES.includes(protocol.name));
}

function formatTvl(tvl: number): string {
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(2)}M`;
  return `$${tvl.toLocaleString()}`;
}

export default async function Home() {
  const tokens = await getRwaTokens();

  return (
    <div className="min-h-screen bg-[#0B0E14] text-white">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-semibold mb-8">RugLens</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tokens.map((token) => (
            <div
              key={token.name}
              className="bg-[#151922] border border-white/10 rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-start justify-between">
                <h2 className="text-base font-medium text-white">
                  {token.name}
                </h2>
                <WatchlistButton tokenName={token.name} />
              </div>

              <div>
                <p className="text-3xl font-semibold text-white">
                  {formatTvl(token.tvl)}
                </p>
                <p className="text-xs text-white/50 mt-1">TVL</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-1">
                {(token.tags ?? []).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-wide px-2 py-1 rounded-full border border-blue-500/40 text-blue-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {tokens.length === 0 && (
          <p className="text-white/50">No tokens matched. Check TOKEN_NAMES.</p>
        )}
      </div>
    </div>
  );
}