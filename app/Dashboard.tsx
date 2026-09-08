"use client";

import { useMemo, useState } from "react";
import WatchlistButton from "./WatchlistButton";

type Protocol = {
  name: string;
  tvl: number;
  tags?: string[];
  chains?: string[];
};

const FILTERS = [
  "All",
  "Treasury Bills",
  "Private Credit",
  "Real Estate",
  "Commodities",
  "Money Market Funds",
  "Other Fixed Income",
];

function formatTvl(tvl: number): string {
  if (tvl >= 1_000_000_000) return `$${(tvl / 1_000_000_000).toFixed(2)}B`;
  if (tvl >= 1_000_000) return `$${(tvl / 1_000_000).toFixed(2)}M`;
  return `$${tvl.toLocaleString()}`;
}

export default function Dashboard({ tokens }: { tokens: Protocol[] }) {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTokens = useMemo(() => {
    if (activeFilter === "All") return tokens;
    return tokens.filter((token) => token.tags?.includes(activeFilter));
  }, [tokens, activeFilter]);

  const totalTvl = useMemo(
    () => filteredTokens.reduce((sum, token) => sum + token.tvl, 0),
    [filteredTokens]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                activeFilter === filter
                  ? "bg-blue-500/20 border-blue-500 text-blue-400"
                  : "border-white/10 text-white/60 hover:border-white/30"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="text-right">
          <p className="text-xs text-white/50">Total TVL</p>
          <p className="text-lg font-semibold text-white">
            {formatTvl(totalTvl)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTokens.map((token) => (
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

      {filteredTokens.length === 0 && (
        <p className="text-white/50">No tokens match this filter.</p>
      )}
    </div>
  );
}