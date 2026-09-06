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

export default async function Home() {
  const tokens = await getRwaTokens();

  return (
    <div style={{ padding: "2rem", fontFamily: "monospace" }}>
      <h1>RugLens — RWA Watchlist (raw data test)</h1>
      <ul>
        {tokens.map((token) => (
          <li key={token.name} style={{ marginBottom: "1rem" }}>
            <strong>{token.name}</strong> — TVL: $
            {token.tvl.toLocaleString()}
            <br />
            Tags: {token.tags?.join(", ") ?? "none"}
          </li>
        ))}
      </ul>
      {tokens.length === 0 && <p>No tokens matched. Check TOKEN_NAMES.</p>}
    </div>
  );
}