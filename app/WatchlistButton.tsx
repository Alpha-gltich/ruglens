"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "ruglens-watchlist";

function getWatchlist(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveWatchlist(list: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export default function WatchlistButton({ tokenName }: { tokenName: string }) {
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    setIsWatched(getWatchlist().includes(tokenName));
  }, [tokenName]);

  function toggleWatchlist() {
    const current = getWatchlist();
    const updated = current.includes(tokenName)
      ? current.filter((name) => name !== tokenName)
      : [...current, tokenName];

    saveWatchlist(updated);
    setIsWatched(updated.includes(tokenName));
  }

  return (
    <button
      onClick={toggleWatchlist}
      aria-label={isWatched ? "Remove from watchlist" : "Add to watchlist"}
      className={`text-xl leading-none transition-colors ${
        isWatched
          ? "text-yellow-400 hover:text-yellow-300"
          : "text-white/30 hover:text-white/60"
      }`}
    >
      {isWatched ? "★" : "☆"}
    </button>
  );
}